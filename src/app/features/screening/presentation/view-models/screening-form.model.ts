import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ScreeningAnswerFormModel = {
  screeningQuestionId: FormControl<number>;
  answer: FormControl<boolean | null>;
  additionalText: FormControl<string | null>;
  conditionalDateValue: FormControl<string | null>;
};

export type ScreeningAnswerFormGroup = FormGroup<ScreeningAnswerFormModel>;

export type ScreeningFormModel = {
  answers: FormArray<ScreeningAnswerFormGroup>;
  iConfirm: FormControl<boolean>;
};

export type ScreeningFormGroup = FormGroup<ScreeningFormModel>;
