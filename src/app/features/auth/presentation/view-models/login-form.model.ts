import { FormControl } from '@angular/forms';
export type LoginFormModel = {
  nationalId: FormControl<string>;
  password: FormControl<string>;

};
