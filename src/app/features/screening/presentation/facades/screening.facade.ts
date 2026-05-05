import { Injectable, inject } from '@angular/core';
import { Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, catchError, finalize, map, tap, throwError } from 'rxjs';

import {
  SCREENING_DONATION_INTENT_SOURCE,
  ScreeningQueryContextModel
} from '../../domain/models/screening-query-context.model';
import { ScreeningResultModel } from '../../domain/models/screening-result.model';
import { ScreeningQuestionModel } from '../../domain/models/screening-question.model';
import { ScreeningSessionType } from '../../domain/enums/screening-session-type.enum';
import { ScreeningResultStatus } from '../../domain/enums/screening-result-status.enum';
import { ScreeningRepository } from '../../domain/repositories/screening.repository';
import { ScreeningSubmissionModel } from '../../domain/models/screening-submission.model';
import { ScreeningStore } from '../store/screening.store';

const SCREENING_INVALID_SESSION_ERROR_KEY =
  'Screening-Keys.ERRORS.INVALID_SESSION_CONTEXT';
const SCREENING_INVALID_DONATION_ERROR_KEY =
  'Screening-Keys.ERRORS.INVALID_DONATION_CONTEXT';
const SCREENING_LOAD_FAILED_ERROR_KEY =
  'Screening-Keys.ERRORS.LOAD_FAILED';
const SCREENING_SUBMIT_FAILED_ERROR_KEY =
  'Screening-Keys.ERRORS.SUBMIT_FAILED';

interface ScreeningAnswerFormValue {
  screeningQuestionId: number;
  answer: boolean;
  additionalText?: string | null;
  conditionalDateValue?: string | null;
}

interface ScreeningFormValue {
  answers: ScreeningAnswerFormValue[];
}

@Injectable()
export class ScreeningFacade {
  private readonly screeningRepository = inject(ScreeningRepository);
  private readonly screeningStore = inject(ScreeningStore);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  readonly context = this.screeningStore.context;
  readonly questions = this.screeningStore.questions;
  readonly loading = this.screeningStore.loading;
  readonly submitting = this.screeningStore.submitting;
  readonly error = this.screeningStore.error;
  readonly result = this.screeningStore.result;
  readonly resultMessageVisible = this.screeningStore.resultMessageVisible;
  readonly hasContext = this.screeningStore.hasContext;
  readonly hasQuestions = this.screeningStore.hasQuestions;
  readonly hasError = this.screeningStore.hasError;
  readonly hasResult = this.screeningStore.hasResult;

  initializeContext(queryParams: Params): ScreeningQueryContextModel | null {
    this.screeningStore.clear();

    const sessionType = this.parseSessionType(queryParams['sessionType']);

    if (sessionType === null) {
      this.setError(SCREENING_INVALID_SESSION_ERROR_KEY);
      return null;
    }

    const source = this.parseSource(queryParams['source']);
    const donationIntentId = this.parsePositiveNumber(
      queryParams['donationIntentId']
    );
    const requiresDonationIntentId =
      sessionType === ScreeningSessionType.PreDonation &&
      source === SCREENING_DONATION_INTENT_SOURCE;

    if (requiresDonationIntentId && donationIntentId === null) {
      this.setError(SCREENING_INVALID_DONATION_ERROR_KEY);
      return null;
    }

    const context: ScreeningQueryContextModel = {
      sessionType,
      isForFemaleOnly: this.parseBoolean(queryParams['isForFemaleOnly']),
      source,
      donationIntentId,
      requiresDonationIntentId
    };

    this.screeningStore.setContext(context);
    this.screeningStore.setError(null);

    return context;
  }

  loadQuestions(
    context: ScreeningQueryContextModel | null = this.screeningStore.context()
  ): Observable<ScreeningQuestionModel[]> {
    if (context === null) {
      const message = this.translate.instant(SCREENING_INVALID_SESSION_ERROR_KEY);
      this.screeningStore.setError(message);
      return throwError(() => new Error(message));
    }

    this.screeningStore.setLoading(true);
    this.screeningStore.setError(null);
    this.screeningStore.setQuestions([]);

    return this.screeningRepository.getQuestions(context).pipe(
      map((questions) =>
        [...questions].sort((current, next) =>
          current.displayOrder - next.displayOrder
        )
      ),
      tap((questions) => this.screeningStore.setQuestions(questions)),
      catchError(() => {
        const message = this.translate.instant(SCREENING_LOAD_FAILED_ERROR_KEY);
        this.screeningStore.setError(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.screeningStore.setLoading(false))
    );
  }

  normalizeSubmitPayload(formValue: ScreeningFormValue): ScreeningSubmissionModel {
    const context = this.screeningStore.context();

    if (context === null) {
      throw new Error(this.translate.instant(SCREENING_INVALID_SESSION_ERROR_KEY));
    }

    return {
      sessionType: context.sessionType,
      donationIntentId: context.donationIntentId ?? null,
      answers: formValue.answers.map((answer) => ({
        screeningQuestionId: answer.screeningQuestionId,
        answer: answer.answer,
        additionalText: this.normalizeAdditionalText(answer.additionalText),
        conditionalDateValue: this.normalizeConditionalDateValue(
          answer.conditionalDateValue
        )
      }))
    };
  }

  submitScreening(formValue: ScreeningFormValue): Observable<ScreeningResultModel> {
    let submission: ScreeningSubmissionModel;

    try {
      submission = this.normalizeSubmitPayload(formValue);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : this.translate.instant(SCREENING_INVALID_SESSION_ERROR_KEY);
      this.screeningStore.setError(message);
      return throwError(() => new Error(message));
    }

    this.screeningStore.setSubmitting(true);
    this.screeningStore.setError(null);
    this.screeningStore.setResult(null);
    this.screeningStore.setResultMessageVisible(false);

    return this.screeningRepository.submitScreening(submission).pipe(
      tap((result) => this.handleSubmitResult(result)),
      catchError(() => {
        const message = this.translate.instant(SCREENING_SUBMIT_FAILED_ERROR_KEY);
        this.screeningStore.setError(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.screeningStore.setSubmitting(false))
    );
  }

  handleSubmitResult(result: ScreeningResultModel): void {
    this.screeningStore.setResult(result);

    if (this.shouldShowResultMessage(result)) {
      this.screeningStore.setResultMessageVisible(true);
      return;
    }

    this.navigateToDashboard();
  }

  dismissResultAndNavigate(): void {
    this.screeningStore.setResultMessageVisible(false);
    this.navigateToDashboard();
  }

  private parseSessionType(value: unknown): ScreeningSessionType | null {
    const numericValue = this.parsePositiveNumber(value);

    switch (numericValue) {
      case ScreeningSessionType.Registration:
        return ScreeningSessionType.Registration;
      case ScreeningSessionType.PreDonation:
        return ScreeningSessionType.PreDonation;
      default:
        return null;
    }
  }

  private parseSource(value: unknown): string | null {
    const source = this.firstParamValue(value);

    return source === SCREENING_DONATION_INTENT_SOURCE
      ? SCREENING_DONATION_INTENT_SOURCE
      : null;
  }

  private parseBoolean(value: unknown): boolean {
    const booleanValue = this.firstParamValue(value);

    return value === true || booleanValue?.toLowerCase() === 'true';
  }

  private parsePositiveNumber(value: unknown): number | null {
    const rawValue = this.firstParamValue(value);

    if (rawValue === null || rawValue.trim() === '') {
      return null;
    }

    const numericValue = Number(rawValue);

    return Number.isInteger(numericValue) && numericValue > 0
      ? numericValue
      : null;
  }

  private firstParamValue(value: unknown): string | null {
    const rawValue = Array.isArray(value) ? value[0] : value;

    if (rawValue === null || rawValue === undefined) {
      return null;
    }

    return String(rawValue);
  }

  private setError(translationKey: string): void {
    this.screeningStore.setError(this.translate.instant(translationKey));
  }

  private normalizeAdditionalText(value: string | null | undefined): string | null {
    const normalizedValue = value?.trim() ?? '';

    return normalizedValue === '' ? null : normalizedValue;
  }

  private normalizeConditionalDateValue(
    value: string | null | undefined
  ): string | null {
    const normalizedValue = value?.trim() ?? '';

    return normalizedValue === '' ? null : normalizedValue;
  }

  private shouldShowResultMessage(result: ScreeningResultModel): boolean {
    const hasResultDetails =
      this.hasText(result.nextEligibleDate) ||
      this.hasText(result.deferralReason);

    return hasResultDetails && (
      result.resultEligibilityStatus === ScreeningResultStatus.Deferred ||
      result.resultEligibilityStatus === ScreeningResultStatus.Ineligible
    );
  }

  private navigateToDashboard(): void {
    this.router.navigateByUrl('/user/dashboard', {
      replaceUrl: true
    });
  }

  private hasText(value: string | null | undefined): boolean {
    return value !== null && value !== undefined && value.trim() !== '';
  }
}
