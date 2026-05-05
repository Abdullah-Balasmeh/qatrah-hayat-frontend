import { CitizenInfoResponseDto } from "../dtos/citizen-info-response.dto";
import { CitizenInfoModel } from "../../domain/models/citizen-info.model";

export function mapCitizenInfoResponseDtoToModel(
  dto: CitizenInfoResponseDto
): CitizenInfoModel {
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

    maritalStatus: dto.maritalStatus,
    jobTitle: dto.jobTitle ?? null,
    address: dto.address ?? null,

    bloodTypeStatus: dto.bloodTypeStatus,
    eligibilityStatus: dto.eligibilityStatus,
    donationCount: dto.donationCount,

    permanentDeferralReason: dto.permanentDeferralReason ?? null,
    lastDonationDate: dto.lastDonationDate ?? null,
    nextEligibleDate: dto.nextEligibleDate ?? null,
    bloodTypeConfirmedAt: dto.bloodTypeConfirmedAt ?? null,
  };
}