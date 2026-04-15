
import { CurrentUserModel } from '../../domain/models/current-user.model';
import { CurrentUserDto } from '../dtos/current-user.dto';

export function mapCurrentUserDtoToCurrentUserModel(
  response: CurrentUserDto
): CurrentUserModel {
  return {
    userId: response.userId,
    email: response.email,
    fullNameAr: response.fullNameAr,
    fullNameEn: response.fullNameEn,
    gender: response.gender,
    isProfileCompleted: response.isProfileCompleted,
    roles: response.roles,
    dateOfBirth: response.dateOfBirth,
    bloodType: response.bloodType,
    branchId: response.branchId,
    hospitalId: response.hospitalId,
  };
}
