import { GenderEnum } from "../../../../core/enums/gender-enum";
import { UserRole } from "../../../../core/enums/user-role.enum";

export interface CurrentUserDto {
  userId: number;
  email: string;
  fullNameAr: string;
  fullNameEn: string;
  gender: GenderEnum;
  isProfileCompleted: boolean;
  roles: UserRole[];
}
