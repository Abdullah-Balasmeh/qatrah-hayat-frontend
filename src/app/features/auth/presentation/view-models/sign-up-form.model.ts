import { FormControl } from '@angular/forms';
import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { GenderEnum } from '../../../../core/enums/gender-enum';
import { MaritalStatusEnum } from '../../../../core/enums/marital-status-enum';

export type SignUpFormModel = {
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
  iAgree: FormControl<boolean>;
  iConfirm: FormControl<boolean>;
  bloodTypeDisplay: FormControl<string>;
  genderDisplay: FormControl<string>;
};
