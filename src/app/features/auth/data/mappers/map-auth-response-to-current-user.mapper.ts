import { CurrentUserModel } from "../../../../core/enums/current-user.model";
import { AuthResponseDto } from "../dots/auth-response.dto";


export function mapAuthResponseToCurrentUser(response: AuthResponseDto): CurrentUserModel {
  return {
    userId: response.userId,
    email: response.email,
    fullNameAr: response.fullNameAr,
    fullNameEn: response.fullNameEn,
    gender: response.gender,
    isProfileCompleted: response.isProfileCompleted,
    role: response.role
  };
}
