import { FormControl } from '@angular/forms';

export interface AddBranchFormModel {
  branchNameAr: FormControl<string>;
  branchNameEn: FormControl<string>;

  addressAr: FormControl<string>;
  addressEn: FormControl<string>;

  managerUserId: FormControl<number | null>;

  gpsLat: FormControl<number | null>;
  gpsLng: FormControl<number | null>;

  email: FormControl<string>;
  phone: FormControl<string>;
}
