import { BloodTypeEnum } from "../../../../core/enums/blood-type-enum";
import { GenderEnum } from "../../../../core/enums/gender-enum";
import { MaritalStatusEnum } from "../../../../core/enums/marital-status-enum";
import { UserRole } from "../../../../core/enums/user-role.enum";



export interface AddStaffRequestModel {
  nationalId: string;
  fullNameAr: string;
  fullNameEn: string;
  dateOfBirth: string;
  bloodType: BloodTypeEnum;
  gender: GenderEnum;
  maritalStatus: MaritalStatusEnum;
  email: string;
  phoneNumber: string;
  password?: string | null;
  confirmPassword?: string | null;
  staffRole: UserRole;
  branchId?: number | null;
  hospitalId?: number | null;
}
