import { RegisterRequestModel } from "../../domain/models/register-request.model";
import { RegisterRequestDto } from "../dtos/register-request.dto";



export function mapRegisterRequestModelToRegisterRequestDto(
  request: RegisterRequestModel
): RegisterRequestDto {
  return {
    nationalId: request.nationalId.trim(),
    fullNameAr: request.fullNameAr.trim(),
    fullNameEn: request.fullNameEn.trim(),
    dateOfBirth: new Date(request.dateOfBirth).toISOString(),
    bloodType: Number(request.bloodType),
    gender: Number(request.gender),
    maritalStatus: Number(request.maritalStatus),
    email: request.email.trim().toLowerCase(),
    phoneNumber: request.phoneNumber.trim(),
    iAgree: request.iAgree,
    iConfirm: request.iConfirm,
    jobTitle: request.jobTitle.trim(),
    address: request.address.trim(),
    password: request.password,
    confirmPassword: request.confirmPassword
  };
}
