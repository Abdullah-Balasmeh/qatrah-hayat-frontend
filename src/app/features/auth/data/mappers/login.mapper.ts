import { LoginRequestModel } from "../../domain/models/login-request.model";
import { LoginRequestDto } from "../dots/login-request.dto";




export function mapLoginFormToLoginRequest(
  formValue: LoginRequestModel
): LoginRequestDto {
  return {
    nationalId: formValue.nationalId.trim(),
    password: formValue.password
  };
}


