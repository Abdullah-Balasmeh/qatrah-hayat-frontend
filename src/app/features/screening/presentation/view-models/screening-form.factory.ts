import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { ScreeningQuestionModel } from '../../domain/models/screening-question.model';
import {
  ScreeningAnswerFormGroup,
  ScreeningAnswerFormModel,
  ScreeningFormGroup,
  ScreeningFormModel
} from './screening-form.model';

const SCREENING_ADDITIONAL_TEXT_MAX_LENGTH = 500;

export function createScreeningForm(
  questions: ScreeningQuestionModel[]
): ScreeningFormGroup {
  return new FormGroup<ScreeningFormModel>({
    answers: new FormArray<ScreeningAnswerFormGroup>(
      questions.map(createScreeningAnswerGroup)
    ),
    iConfirm: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue]
    })
  });
}

function createScreeningAnswerGroup(
  question: ScreeningQuestionModel
): ScreeningAnswerFormGroup {
  const answerGroup = new FormGroup<ScreeningAnswerFormModel>({
    screeningQuestionId: new FormControl(question.id, {
      nonNullable: true
    }),
    answer: new FormControl<boolean | null>(null, {
      validators: [requiredAnswerValidator]
    }),
    additionalText: new FormControl<string | null>(null, {
      validators: [
        conditionalAdditionalTextRequiredValidator(question),
        Validators.maxLength(SCREENING_ADDITIONAL_TEXT_MAX_LENGTH)
      ]
    }),
    conditionalDateValue: new FormControl<string | null>(null, {
      validators: [
        conditionalDateRequiredValidator(question),
        validDateValidator,
        noFutureDateValidator
      ]
    })
  });

  registerConditionalValueReset(answerGroup);

  return answerGroup;
}

function registerConditionalValueReset(
  answerGroup: ScreeningAnswerFormGroup
): void {
  answerGroup.controls.answer.valueChanges.subscribe((answer) => {
    if (answer === false) {
      answerGroup.controls.additionalText.setValue(null, {
        emitEvent: false
      });
      answerGroup.controls.conditionalDateValue.setValue(null, {
        emitEvent: false
      });
    }

    answerGroup.controls.additionalText.updateValueAndValidity({
      emitEvent: false
    });
    answerGroup.controls.conditionalDateValue.updateValueAndValidity({
      emitEvent: false
    });
  });
}

function requiredAnswerValidator(
  control: AbstractControl<boolean | null>
): ValidationErrors | null {
  return control.value === true || control.value === false
    ? null
    : { answerRequired: true };
}

function conditionalAdditionalTextRequiredValidator(
  question: ScreeningQuestionModel
): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    if (!isYesAnswer(control) || !question.requiresAdditionalText) {
      return null;
    }

    return hasText(control.value)
      ? null
      : { additionalTextRequired: true };
  };
}

function conditionalDateRequiredValidator(
  question: ScreeningQuestionModel
): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    if (!isYesAnswer(control) || !question.requiresDateValue) {
      return null;
    }

    return hasText(control.value) ? null : { dateRequired: true };
  };
}

function validDateValidator(
  control: AbstractControl<string | null>
): ValidationErrors | null {
  if (!hasText(control.value)) {
    return null;
  }

  return parseDateInput(control.value) === null
    ? { invalidDate: true }
    : null;
}

function noFutureDateValidator(
  control: AbstractControl<string | null>
): ValidationErrors | null {
  const date = parseDateInput(control.value);

  if (date === null) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date > today ? { futureDate: true } : null;
}

function isYesAnswer(control: AbstractControl): boolean {
  const parent = control.parent as ScreeningAnswerFormGroup | null;

  return parent?.controls.answer.value === true;
}

function hasText(value: string | null): boolean {
  return value !== null && value.trim() !== '';
}

function parseDateInput(value: string | null): Date | null {
  if (value === null || value.trim() === '') {
    return null;
  }

  const normalizedValue = value.trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalizedValue);

  if (match === null) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  date.setHours(0, 0, 0, 0);

  return date;
}
