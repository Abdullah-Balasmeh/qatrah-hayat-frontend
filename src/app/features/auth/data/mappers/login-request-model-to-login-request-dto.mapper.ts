import { LoginRequestModel } from '../../domain/models/login-request.model';
import { LoginRequestDto } from '../dtos/login-request.dto';

export function mapLoginRequestModelToLoginRequestDto(
  request: LoginRequestModel
): LoginRequestDto {
  return {
    nationalId: request.nationalId.trim(),
    password: request.password
  };
}
