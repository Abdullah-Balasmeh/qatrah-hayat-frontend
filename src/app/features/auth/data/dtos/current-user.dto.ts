import { BloodTypeEnum } from "../../../../core/enums/blood-type-enum";
import { GenderEnum } from "../../../../core/enums/gender-enum";
import { UserRole } from "../../../../core/enums/user-role.enum";

export interface CurrentUserDto {
  userId: number;
  email: string;
  fullNameAr: string;
  fullNameEn: string;
  roles: UserRole[];
  gender: GenderEnum;
  dateOfBirth: string;
  bloodType: BloodTypeEnum;
  branchId: number | null;
  hospitalId: number | null;
  isProfileCompleted: boolean;
}
