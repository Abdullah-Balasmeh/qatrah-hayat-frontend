import { AuthUserModel } from '../../domain/models/auth-user.model';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function mapAuthResponseDtoToAuthUserModel(
  response: AuthResponseDto
): AuthUserModel {
  return {
    userId: response.userId,
    email: response.email,
    fullNameAr: response.fullNameAr,
    fullNameEn: response.fullNameEn,
    gender: response.gender,
    isProfileCompleted: response.isProfileCompleted,
    roles: response.roles,
    token: response.token
  };
}
