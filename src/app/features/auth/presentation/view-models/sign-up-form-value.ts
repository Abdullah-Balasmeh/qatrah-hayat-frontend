import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { GenderEnum } from '../../../../core/enums/gender-enum';
import { MaritalStatusEnum } from '../../../../core/enums/marital-status-enum';

export type SignUpFormValue = {
  nationalId: string;
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  phoneNumber: string;
  bloodType: BloodTypeEnum | null;
  bloodTypeDisplay: string;
  dateOfBirth: string;
  gender: GenderEnum | null;
  genderDisplay: string;
  address: string;
  jobTitle: string;
  maritalStatus: MaritalStatusEnum | null;
  password: string;
  confirmPassword: string;
  iAgree: boolean;
  iConfirm: boolean;
};
