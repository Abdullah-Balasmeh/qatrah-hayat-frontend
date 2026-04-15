import { AuthUserModel } from '../../domain/models/auth-user.model';
import { LoginResponseDto } from '../dtos/login-response.dto';

export function mapLoginResponseDtoToAuthUserModel(
  response: LoginResponseDto
): AuthUserModel {
  return {
    userId: response.userId,
    email: response.email,
    fullNameAr: response.fullNameAr,
    fullNameEn: response.fullNameEn,
    gender: response.gender,
    isProfileCompleted: response.isProfileCompleted,
    roles: response.roles,
    token: response.token,
    dateOfBirth: response.dateOfBirth,
    bloodType: response.bloodType,
    branchId: response.branchId,
    hospitalId: response.hospitalId,
  };
}
