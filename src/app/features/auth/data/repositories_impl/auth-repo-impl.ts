import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { LoginRequestModel } from '../../domain/models/login-request.model';
import { RegisterRequestModel } from '../../domain/models/register-request.model';
import { CurrentUserModel } from '../../domain/models/current-user.model';

import { AuthApiService } from '../services/auth-api.service';
import { mapLoginRequestModelToLoginRequestDto } from '../mappers/login-request-model-to-login-request-dto.mapper';
import { AuthRepo } from '../../domain/repositories/auth.repo';
import { AuthUserModel } from '../../domain/models/auth-user.model';
import { mapLoginResponseDtoToAuthUserModel } from '../mappers/login-response-dto-to-auth-user-model.mapper';
import { mapCurrentUserDtoToCurrentUserModel } from '../mappers/current-user-dto-to-current-user-model.mapper';
import { mapRegisterRequestModelToRegisterRequestDto } from '../mappers/register-request-model-to-register-request-dto.mapper';
import { RegisterResponseModel } from '../../domain/models/register-response.model';
import { mapRegisterResponseDtoToRegisterResponseModel } from '../mappers/register-response-dto-to-register-response-model';
import { ForgotPasswordRequestModel } from '../../domain/models/forgot-password-request.model';
import { ResetPasswordRequestModel } from '../../domain/models/reset-password-request.model';
import { VerifyResetOtpRequestModel } from '../../domain/models/verify-reset-otp-request.model';
import { VerifyResetOtpResponseModel } from '../../domain/models/verify-reset-otp-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryImpl implements AuthRepo {
  private readonly api = inject(AuthApiService);

  login(request: LoginRequestModel): Observable<AuthUserModel> {
    const dto = mapLoginRequestModelToLoginRequestDto(request);

    return this.api.login(dto).pipe(
      map(mapLoginResponseDtoToAuthUserModel)
    );
  }

  register(request: RegisterRequestModel): Observable<RegisterResponseModel> {
    const dto = mapRegisterRequestModelToRegisterRequestDto(request);

    return this.api.signUp(dto).pipe(
      map(mapRegisterResponseDtoToRegisterResponseModel)
    );
  }

  getCurrentUser(): Observable<CurrentUserModel> {
    return this.api.getCurrentUser().pipe(
      map(mapCurrentUserDtoToCurrentUserModel)
    );
  }

  forgotPassword(request: ForgotPasswordRequestModel): Observable<void> {
  return this.api.forgotPassword(request).pipe(
    map(() => void 0)
  );
}

verifyResetOtp(
  request: VerifyResetOtpRequestModel
): Observable<VerifyResetOtpResponseModel> {
  return this.api.verifyResetOtp(request).pipe(
    map((response) => ({
      resetSessionToken: response.resetSessionToken,
      message: response.message,
    }))
  );
}

resetPassword(request: ResetPasswordRequestModel): Observable<void> {
  return this.api.resetPassword(request).pipe(
    map(() => void 0)
  );
}
}
