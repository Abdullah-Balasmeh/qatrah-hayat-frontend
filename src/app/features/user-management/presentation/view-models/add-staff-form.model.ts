import { FormControl } from '@angular/forms';

import { UserRole } from '../../../../core/enums/user-role.enum';
import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { GenderEnum } from '../../../../core/enums/gender-enum';
import { MaritalStatusEnum } from '../../../../core/enums/marital-status-enum';

export interface AddStaffFormModel {
  nationalId: FormControl<string>;
  fullNameAr: FormControl<string>;
  fullNameEn: FormControl<string>;
  dateOfBirth: FormControl<string>;
  bloodType: FormControl<BloodTypeEnum | null>;
  gender: FormControl<GenderEnum | null>;
  maritalStatus: FormControl<MaritalStatusEnum | null>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  staffRole: FormControl<UserRole | null>;
  branchId: FormControl<number | null>;
  hospitalId: FormControl<number | null>;
}
