import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BranchDayOfWeek } from '../../domain/models/branch-working-hour.model';

export interface EditBranchWorkingHourFormGroup {
  dayOfWeek: FormControl<BranchDayOfWeek>;
  openTime: FormControl<string>;
  closeTime: FormControl<string>;
  isClosed: FormControl<boolean>;
}

export interface EditBranchFormModel {
  branchNameAr: FormControl<string>;
  branchNameEn: FormControl<string>;

  addressAr: FormControl<string>;
  addressEn: FormControl<string>;

  managerUserId: FormControl<number | null>;

  isActive: FormControl<boolean>;

  gpsLat: FormControl<number | null>;
  gpsLng: FormControl<number | null>;

  email: FormControl<string>;
  phone: FormControl<string>;

  workingHours: FormArray<FormGroup<EditBranchWorkingHourFormGroup>>;
}
