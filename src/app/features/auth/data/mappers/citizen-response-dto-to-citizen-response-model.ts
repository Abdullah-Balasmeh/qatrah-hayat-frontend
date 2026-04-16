import { CitizenResponseModel } from "../../domain/models/citizen-response.model";
import { CitizenResponseDto } from "../dtos/citizen-response.dto";

export function mapCitizenResponseDtoToCitizenResponseModel(
  response: CitizenResponseDto
): CitizenResponseModel {
  return {
    nationalId: response.nationalId,
    fullNameAr: response.fullNameAr,
    fullNameEn: response.fullNameEn,
    gender: response.gender,
    dateOfBirth: response.dateOfBirth,
    bloodType: response.bloodType,
  };
}
