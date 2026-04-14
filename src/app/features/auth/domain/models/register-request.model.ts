import { BloodTypeEnum } from "../../../../core/enums/blood-type-enum";
import { GenderEnum } from "../../../../core/enums/gender-enum";
import { MaritalStatusEnum } from "../../../../core/enums/marital-status-enum";


export interface RegisterRequestModel {
  nationalId: string;
  fullNameAr: string;
  fullNameEn: string;
  dateOfBirth: string;
  bloodType: BloodTypeEnum;
  gender: GenderEnum;
  maritalStatus: MaritalStatusEnum;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  address: string;
  password: string;
  confirmPassword: string;
  iAgree: boolean;
  iConfirm: boolean;
}
