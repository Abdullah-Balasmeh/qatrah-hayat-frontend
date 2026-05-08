import { FormControl } from '@angular/forms';

export interface EditHospitalFormModel {
  hospitalNameAr: FormControl<string>;
  hospitalNameEn: FormControl<string>;

  addressAr: FormControl<string>;
  addressEn: FormControl<string>;

  branchId: FormControl<number | null>;

  isActive: FormControl<boolean>;
}
