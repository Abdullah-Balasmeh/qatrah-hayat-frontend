import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { CurrentUserDto } from '../dtos/current-user.dto';
import { RegisterResponseDto } from '../dtos/register-response.dto';
import { ForgotPasswordRequestDto } from '../dtos/forgot-password-request.dto';
import { ForgotPasswordResponseDto } from '../dtos/forgot-password-response.dto';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';
import { ResetPasswordResponseDto } from '../dtos/reset-password-response.dto';
import { VerifyResetOtpRequestDto } from '../dtos/verify-reset-otp-request.dto';
import { VerifyResetOtpResponseDto } from '../dtos/verify-reset-otp-response.dto';



@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly api = inject(ApiService);

  private readonly registerUrl = API_ENDPOINTS.auth.register;
  private readonly loginUrl = API_ENDPOINTS.auth.login;
  private readonly currentUserUrl = API_ENDPOINTS.auth.me;
  private readonly forgotPasswordUrl = API_ENDPOINTS.auth.forgotPassword;
private readonly verifyResetOtpUrl = API_ENDPOINTS.auth.verifyResetOtp;
private readonly resetPasswordUrl = API_ENDPOINTS.auth.resetPassword;


  login(request: LoginRequestDto): Observable<LoginResponseDto> {
    return this.api.post<LoginRequestDto, LoginResponseDto>(
      this.loginUrl,
      request
    );
  }

  signUp(request: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.api.post<RegisterRequestDto, RegisterResponseDto>(
      this.registerUrl,
      request
    );
  }

  getCurrentUser(): Observable<CurrentUserDto> {
    return this.api.get<CurrentUserDto>(this.currentUserUrl);
  }
  forgotPassword(
  request: ForgotPasswordRequestDto
): Observable<ForgotPasswordResponseDto> {
  return this.api.post<ForgotPasswordRequestDto, ForgotPasswordResponseDto>(
    this.forgotPasswordUrl,
    request
  );
}

verifyResetOtp(
  request: VerifyResetOtpRequestDto
): Observable<VerifyResetOtpResponseDto> {
  return this.api.post<VerifyResetOtpRequestDto, VerifyResetOtpResponseDto>(
    this.verifyResetOtpUrl,
    request
  );
}

resetPassword(
  request: ResetPasswordRequestDto
): Observable<ResetPasswordResponseDto> {
  return this.api.post<ResetPasswordRequestDto, ResetPasswordResponseDto>(
    this.resetPasswordUrl,
    request
  );
}
}
