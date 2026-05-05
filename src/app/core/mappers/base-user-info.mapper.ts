import { BaseUserInfoDto } from '../dtos/base-user-info.dto';
import { BaseUserInfoModel } from '../models/base-user-info.model';

export function mapBaseUserInfoDtoToModel(
  dto: BaseUserInfoDto
): BaseUserInfoModel {
  return {
    userId: dto.userId,
    nationalId: dto.nationalId,
    email: dto.email,
    fullNameAr: dto.fullNameAr,
    fullNameEn: dto.fullNameEn,
    roles: dto.roles,
    gender: dto.gender,
    dateOfBirth: dto.dateOfBirth,
    bloodType: dto.bloodType,
    branchId: dto.branchId,
    hospitalId: dto.hospitalId,
    isProfileCompleted: dto.isProfileCompleted,
    isActive: dto.isActive,
    isDeleted: dto.isDeleted,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    phoneNumber: dto.phoneNumber,
  };
}