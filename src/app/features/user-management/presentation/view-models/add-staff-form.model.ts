import { FormControl } from '@angular/forms';

import { UserRole } from '../../../../core/enums/user-role.enum';
import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { GenderEnum } from '../../../../core/enums/gender-enum';
import { MaritalStatusEnum } from '../../../../core/enums/marital-status-enum';

export interface AddStaffFormModel {
  nationalId: FormControl<string>;
  fullNameAr: FormControl<string>;
  fullNameEn: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  bloodType: FormControl<BloodTypeEnum | null>;
  dateOfBirth: FormControl<string>;
  gender: FormControl<GenderEnum | null>;
  address: FormControl<string>;
  jobTitle: FormControl<string>;
  maritalStatus: FormControl<MaritalStatusEnum | null>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  bloodTypeDisplay: FormControl<string>;
  genderDisplay: FormControl<string>;
  staffRole: FormControl<UserRole | null>;
  branchId: FormControl<number | null>;
  hospitalId: FormControl<number | null>;
}
