import { GenderEnum } from "../../../../core/enums/gender-enum";


export interface AuthResponseDto {
  userId: number;
  email: string;
  fullNameAr: string;
  fullNameEn: string;
  gender: GenderEnum;
  isProfileCompleted: boolean;
  role: string;
  token: string;
}
