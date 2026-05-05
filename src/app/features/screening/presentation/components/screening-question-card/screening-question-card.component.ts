import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { TextFieldComponent } from '../../../../../shared/ui/text-field/text-field.component';
import { ScreeningQuestionModel } from '../../../domain/models/screening-question.model';
import { ScreeningAnswerFormGroup } from '../../view-models/screening-form.model';
import { DateTextFieldComponent } from "../../../../../shared/ui/date-text-field/date-text-field.component";

@Component({
  selector: 'app-screening-question-card',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormErrorMessageComponent,
    TextFieldComponent,
    DateTextFieldComponent
],
  templateUrl: './screening-question-card.component.html',
  styleUrl: './screening-question-card.component.css'
})
export class ScreeningQuestionCardComponent {
  @Input({ required: true }) question!: ScreeningQuestionModel;
  @Input({ required: true }) answerGroup!: ScreeningAnswerFormGroup;
  @Input() questionNumber = 1;
  @Input() language: 'ar' | 'en' | 'AR' | 'EN' = 'en';
  @Output() answerChange = new EventEmitter<boolean>();

  readonly yesKey = 'Screening-Keys.ANSWERS.YES';
  readonly noKey = 'Screening-Keys.ANSWERS.NO';
  readonly answerRequiredKey = 'Screening-Keys.VALIDATION.ANSWER_REQUIRED';
  readonly additionalTextRequiredKey =
    'Screening-Keys.VALIDATION.ADDITIONAL_TEXT_REQUIRED';
  readonly additionalTextMaxLengthKey =
    'Screening-Keys.VALIDATION.ADDITIONAL_TEXT_MAX_LENGTH';
  readonly dateRequiredKey = 'Screening-Keys.VALIDATION.DATE_REQUIRED';
  readonly invalidDateKey = 'Screening-Keys.VALIDATION.DATE_INVALID';
  readonly futureDateKey = 'Screening-Keys.VALIDATION.DATE_FUTURE';
  readonly additionalTextFallbackKey = 'Screening-Keys.FIELDS.ADDITIONAL_TEXT';
  readonly conditionalDateFallbackKey = 'Screening-Keys.FIELDS.CONDITIONAL_DATE';

  get questionText(): string {
    return this.pickLocalizedText(
      this.question.questionTextAr,
      this.question.questionTextEn
    );
  }

  get additionalTextLabel(): string | null {
    return this.pickLocalizedNullableText(
      this.question.additionalTextLabelAr,
      this.question.additionalTextLabelEn
    );
  }

  get conditionalDateLabel(): string | null {
    return this.pickLocalizedNullableText(
      this.question.dateValueLabelAr,
      this.question.dateValueLabelEn
    );
  }

  get shouldShowAdditionalText(): boolean {
    return this.answerGroup.controls.answer.value === true &&
      this.question.requiresAdditionalText;
  }

  get shouldShowConditionalDate(): boolean {
    return this.answerGroup.controls.answer.value === true &&
      this.question.requiresDateValue;
  }

  onAnswerChange(answer: boolean): void {
    this.answerGroup.controls.answer.setValue(answer);
    this.answerGroup.controls.answer.markAsTouched();
    this.answerChange.emit(answer);
  }

  errorMessageForAnswer(): string | null {
    const control = this.answerGroup.controls.answer;

    if (!control.hasError('answerRequired') || !control.touched) {
      return null;
    }

    return this.answerRequiredKey;
  }

  errorMessageForAdditionalText(): string | null {
    const control = this.answerGroup.controls.additionalText;

    if (!(control.touched || control.dirty)) {
      return null;
    }

    if (control.hasError('additionalTextRequired')) {
      return this.additionalTextRequiredKey;
    }

    if (control.hasError('maxlength')) {
      return this.additionalTextMaxLengthKey;
    }

    return null;
  }

  errorMessageForConditionalDate(): string | null {
    const control = this.answerGroup.controls.conditionalDateValue;

    if (!(control.touched || control.dirty)) {
      return null;
    }

    if (control.hasError('dateRequired')) {
      return this.dateRequiredKey;
    }

    if (control.hasError('invalidDate')) {
      return this.invalidDateKey;
    }

    if (control.hasError('futureDate')) {
      return this.futureDateKey;
    }

    return null;
  }

  private pickLocalizedText(
    arabicText: string | null,
    englishText: string | null
  ): string {
    return this.pickLocalizedNullableText(arabicText, englishText) ?? '';
  }

  private pickLocalizedNullableText(
    arabicText: string | null | undefined,
    englishText: string | null | undefined
  ): string | null {
    const isArabic = this.language.toLowerCase() === 'ar';
    const primaryText = isArabic ? arabicText : englishText;
    const fallbackText = isArabic ? englishText : arabicText;

    return primaryText?.trim() || fallbackText?.trim() || null;
  }
}
