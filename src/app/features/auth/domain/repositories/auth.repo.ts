import { Observable } from 'rxjs';
import { CurrentUserModel } from '../models/current-user.model';
import { LoginRequestModel } from '../models/login-request.model';
import { RegisterRequestModel } from '../models/register-request.model';
import { AuthUserModel } from '../models/auth-user.model';
import { RegisterResponseModel } from '../models/register-response.model';
import { ForgotPasswordRequestModel } from '../models/forgot-password-request.model';
import { ResetPasswordRequestModel } from '../models/reset-password-request.model';
import { VerifyResetOtpRequestModel } from '../models/verify-reset-otp-request.model';
import { VerifyResetOtpResponseModel } from '../models/verify-reset-otp-response.model';

export abstract class AuthRepo {
  abstract login(request: LoginRequestModel): Observable<AuthUserModel>;
  abstract register(request: RegisterRequestModel): Observable<RegisterResponseModel>;
  abstract getCurrentUser(): Observable<CurrentUserModel>;
  abstract forgotPassword(request: ForgotPasswordRequestModel): Observable<void>;

abstract verifyResetOtp(
  request: VerifyResetOtpRequestModel
): Observable<VerifyResetOtpResponseModel>;

abstract resetPassword(request: ResetPasswordRequestModel): Observable<void>;
}
