
import { BloodTypeEnum } from '../enums/blood-type-enum';
import { GenderEnum } from '../enums/gender-enum';
import { UserRole } from '../enums/user-role.enum';

export interface BaseUserInfoModel {
  userId: number;
  nationalId: string;
  email: string;
  fullNameAr: string;
  fullNameEn: string;
  roles: UserRole[];
  gender: GenderEnum;
  dateOfBirth: string;
  bloodType: BloodTypeEnum;
  branchId?: number | null;
  hospitalId?: number | null;
  isProfileCompleted: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string | null;
  phoneNumber: string;
}
