import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';

import { LanguageService } from '../../../../../core/services/language.service';
import { ScreeningActionButtonsComponent } from '../../components/screening-action-buttons/screening-action-buttons.component';
import { ScreeningConfirmationComponent } from '../../components/screening-confirmation/screening-confirmation.component';
import { ScreeningIntroHeaderComponent } from '../../components/screening-intro-header/screening-intro-header.component';
import { ScreeningQuestionListComponent } from '../../components/screening-question-list/screening-question-list.component';
import { ScreeningResultMessageComponent } from '../../components/screening-result-message/screening-result-message.component';
import {
  ScreeningStateMessageComponent,
  ScreeningStateMessageType
} from '../../components/screening-state-message/screening-state-message.component';
import { ScreeningFacade } from '../../facades/screening.facade';
import { createScreeningForm } from '../../view-models/screening-form.factory';
import { ScreeningFormGroup } from '../../view-models/screening-form.model';

@Component({
  selector: 'app-screening-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ScreeningIntroHeaderComponent,
    ScreeningStateMessageComponent,
    ScreeningQuestionListComponent,
    ScreeningConfirmationComponent,
    ScreeningResultMessageComponent,
    ScreeningActionButtonsComponent
  ],
  templateUrl: './screening-page.component.html',
  styleUrl: './screening-page.component.css'
})
export class ScreeningPageComponent {
  readonly facade = inject(ScreeningFacade);

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  readonly screeningForm = signal<ScreeningFormGroup | null>(null);
  readonly currentLanguage = computed(() => this.languageService.currentLangSignal());
  readonly answers = computed(() =>
    this.screeningForm()?.controls.answers ?? null
  );
  readonly stateMessageType = computed<ScreeningStateMessageType>(() =>
    this.facade.hasContext() ? 'error' : 'invalid'
  );
  readonly showConfirmationError = computed(() => {
    const control = this.screeningForm()?.controls.iConfirm;

    return control !== undefined &&
      control.invalid &&
      (control.touched || control.dirty);
  });
  readonly showEmptyState = computed(() =>
    !this.facade.loading() &&
    !this.facade.hasError() &&
    this.facade.hasContext() &&
    !this.facade.hasQuestions()
  );

  constructor() {
    this.route.queryParams.pipe(
      switchMap((queryParams) => {
        this.screeningForm.set(null);

        const context = this.facade.initializeContext(queryParams);

        if (context === null) {
          return of(null);
        }

        return this.facade.loadQuestions(context).pipe(
          map((questions) =>
            questions.length > 0 ? createScreeningForm(questions) : null
          ),
          catchError(() => of(null))
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((form) => this.screeningForm.set(form));
  }

  onSubmit(): void {
    const form = this.screeningForm();

    if (form === null) {
      return;
    }

    form.markAllAsTouched();

    if (form.invalid) {
      return;
    }

    this.facade.submitScreening(this.toFacadeSubmitValue(form)).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      error: () => {}
    });
  }

  onContinueToDashboard(): void {
    this.facade.dismissResultAndNavigate();
  }

  private toFacadeSubmitValue(
    form: ScreeningFormGroup
  ): Parameters<ScreeningFacade['submitScreening']>[0] {
    const formValue = form.getRawValue();

    return {
      answers: formValue.answers.map((answer) => ({
        screeningQuestionId: answer.screeningQuestionId,
        answer: answer.answer as boolean,
        additionalText: answer.additionalText,
        conditionalDateValue: answer.conditionalDateValue
      }))
    };
  }
}
