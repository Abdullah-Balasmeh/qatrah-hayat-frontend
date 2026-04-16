import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFieldsValidator(
  field1: string,
  field2: string,
  errorKey: string = 'fieldsMismatch'
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const control1 = form.get(field1);
    const control2 = form.get(field2);

    if (!control1 || !control2) {
      return null;
    }

    const value1 = control1.value;
    const value2 = control2.value;

    if (value1 === value2) {
      return null;
    }

    return { [errorKey]: true };
  };
}
