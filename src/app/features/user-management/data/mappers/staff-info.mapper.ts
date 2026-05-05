import { StaffInfoResponseDto } from "../dtos/staff-info-response.dto";
import { StaffInfoModel } from "../../domain/models/staff-info.model";

export function mapStaffInfoResponseDtoToModel(
  dto: StaffInfoResponseDto
): StaffInfoModel {
  return {
    userId: dto.userId,
    nationalId: dto.nationalId,
    email: dto.email,
    phoneNumber: dto.phoneNumber,

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

    hospitalNameAr: dto.hospitalNameAr ?? null,
    hospitalNameEn: dto.hospitalNameEn ?? null,
    branchNameAr: dto.branchNameAr ?? null,
    branchNameEn: dto.branchNameEn ?? null,
  };
}