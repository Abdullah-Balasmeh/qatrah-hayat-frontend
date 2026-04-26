import { FormControl } from '@angular/forms';

export interface AddHospitalFormModel {
  hospitalNameAr: FormControl<string>;
  hospitalNameEn: FormControl<string>;

  addressAR: FormControl<string>;
  addressEn: FormControl<string>;

  branchId: FormControl<number | null>;
}
