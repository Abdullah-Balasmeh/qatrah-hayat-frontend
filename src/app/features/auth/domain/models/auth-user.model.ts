import { GenderEnum } from '../../../../core/enums/gender-enum';
import { UserRole } from '../../../../core/enums/user-role.enum';

export interface AuthUserModel {
  userId: number;
  email: string;
  fullNameAr: string;
  fullNameEn: string;
  gender: GenderEnum;
  isProfileCompleted: boolean;
  roles: UserRole[];
  token: string;
}
