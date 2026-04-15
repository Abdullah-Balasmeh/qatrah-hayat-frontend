import { RegisterResponseDto } from "../dtos/register-response.dto";
import { RegisterResponseModel } from "../../domain/models/register-response.model";

export function mapRegisterResponseDtoToRegisterResponseModel(
  response: RegisterResponseDto
): RegisterResponseModel {
  return {
    userId: response.userId,
    email: response.email,
    fullNameAr: response.fullNameAr,
    fullNameEn: response.fullNameEn,
    message: response.message,
  };
}
