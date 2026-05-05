import { CitizenLookupResponseDto } from "../dtos/citizen-lookup-response.dto";
import { CitizenLookupModel } from "../../domain/models/citizen-lookup.model";

export function mapCitizenLookupResponseDtoToModel(
  dto: CitizenLookupResponseDto
): CitizenLookupModel {
  return {
    nationalId: dto.nationalId,
    fullNameAr: dto.fullNameAr,
    fullNameEn: dto.fullNameEn,
    dateOfBirth: dto.dateOfBirth,
    bloodType: dto.bloodType,
    gender: dto.gender,
    isUser: dto.isUser,
    isStaff: dto.isStaff,
    userId: dto.userId,
  };
}