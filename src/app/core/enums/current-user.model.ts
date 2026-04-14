import { GenderEnum } from "./gender-enum";


export interface CurrentUserModel {
  userId: number;
  email: string;
  fullNameAr: string;
  fullNameEn: string;
  gender: GenderEnum;
  isProfileCompleted: boolean;
  role: string;
}
