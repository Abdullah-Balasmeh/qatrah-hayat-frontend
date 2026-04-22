import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError, of, finalize } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


import { AuthTokenService } from '../../../../core/services/auth-token.service';
import { AuthUserStorageService } from '../../data/storage/auth-user-storage.service';

import { LoginRequestModel } from '../../domain/models/login-request.model';
import { CurrentUserModel } from '../../domain/models/current-user.model';
import { Failure } from '../../../../core/errors/failure';
import { GenderEnum } from '../../../../core/enums/gender-enum';
import { ScreeningSessionType } from '../../../screening/domain/enums/screening-session-type.enum';
import { UserRole } from '../../../../core/enums/user-role.enum';
import { AuthStore } from '../store/auth.store';
import { AuthUserModel } from '../../domain/models/auth-user.model';
import { AuthRepo } from '../../domain/repositories/auth.repo';
import { RegisterRequestModel } from '../../domain/models/register-request.model';
import { RegisterResponseModel } from '../../domain/models/register-response.model';
import { ForgotPasswordRequestModel } from '../../domain/models/forgot-password-request.model';
import { ResetPasswordRequestModel } from '../../domain/models/reset-password-request.model';
import { VerifyResetOtpRequestModel } from '../../domain/models/verify-reset-otp-request.model';
import { VerifyResetOtpResponseModel } from '../../domain/models/verify-reset-otp-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly authRepository = inject(AuthRepo);
  private readonly authStore = inject(AuthStore);
  private readonly authTokenService = inject(AuthTokenService);
  private readonly authUserStorageService = inject(AuthUserStorageService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  readonly currentUser = this.authStore.currentUser;
  readonly isLoggedIn = this.authStore.isLoggedIn;
  readonly roles = this.authStore.roles;
  readonly initialized = this.authStore.initialized;
  readonly loading = this.authStore.loading;
  readonly error = this.authStore.error;

   hasRole(roles: UserRole[]): boolean {
    return this.authStore.hasRole(roles);
  }
  loginCitizen(
    request: LoginRequestModel,
    returnUrl: string | null
  ): Observable<void> {
    this.authStore.setLoading(true);
    this.authStore.setError(null);

    return this.authRepository.login(request).pipe(
      tap((authUser) => this.handleLoginSuccess(authUser, request.rememberMe)),
      tap((authUser) => this.redirectAfterCitizenLogin(authUser, returnUrl)),
      map(() => void 0),
      catchError((error: Failure) => {
        const message = this.mapLoginErrorToMessage(error);
        this.authStore.setError(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.authStore.setLoading(false))
    );
  }
  registerCitizen(
  request: RegisterRequestModel
): Observable<RegisterResponseModel> {
  this.authStore.setLoading(true);
  this.authStore.setError(null);

  return this.authRepository.register(request).pipe(
    catchError((error: Failure) => {
      const message = this.mapRegisterErrorToMessage(error);
      this.authStore.setError(message);
      return throwError(() => new Error(message));
    }),
    finalize(() => this.authStore.setLoading(false))
  );
}
loginStaff(
    request: LoginRequestModel
  ): Observable<void> {
    this.authStore.setLoading(true);
    this.authStore.setError(null);

    return this.authRepository.login(request).pipe(
      tap((authUser) => this.handleLoginSuccess(authUser, request.rememberMe)),
      tap((authUser) => this.redirectAfterStaffLogin(authUser)),
      map(() => void 0),
      catchError((error: Failure) => {
        const message = this.mapLoginErrorToMessage(error);
        this.authStore.setError(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.authStore.setLoading(false))
    );
  }


  logoutCitizen(redirectToLogin = true): void {
  this.clearSession();

    if (redirectToLogin) {
      this.router.navigate(['/auth/login']);
    }
  }
    logoutStaff(redirectToLogin = true): void {
    this.clearSession();

    if (redirectToLogin) {
      this.router.navigate(['/auth/staff-login']);
    }
  }

  forgotPassword(request: ForgotPasswordRequestModel): Observable<void> {
  this.authStore.setLoading(true);
  this.authStore.setError(null);

  return this.authRepository.forgotPassword(request).pipe(
    catchError((error: Failure) => {
      const message = this.mapForgotPasswordErrorToMessage(error);
      this.authStore.setError(message);
      return throwError(() => new Error(message));
    }),
    finalize(() => this.authStore.setLoading(false))
  );
}

verifyResetOtp(
  request: VerifyResetOtpRequestModel
): Observable<VerifyResetOtpResponseModel> {
  this.authStore.setLoading(true);
  this.authStore.setError(null);

  return this.authRepository.verifyResetOtp(request).pipe(
    catchError((error: Failure) => {
      const message = this.mapVerifyOtpErrorToMessage(error);
      this.authStore.setError(message);
      return throwError(() => new Error(message));
    }),
    finalize(() => this.authStore.setLoading(false))
  );
}

resetPassword(request: ResetPasswordRequestModel): Observable<void> {
  this.authStore.setLoading(true);
  this.authStore.setError(null);

  return this.authRepository.resetPassword(request).pipe(
    catchError((error: Failure) => {
      const message = this.mapResetPasswordErrorToMessage(error);
      this.authStore.setError(message);
      return throwError(() => new Error(message));
    }),
    finalize(() => this.authStore.setLoading(false))
  );
}

restoreSession(): Observable<boolean> {
  const token = this.authTokenService.getToken();

  if (!token) {
    this.authStore.setInitialized(true);
    return of(false);
  }

  const cachedUser = this.authUserStorageService.getUser();
  if (cachedUser) {
    this.authStore.setCurrentUser(cachedUser);
  }

  this.authStore.setLoading(true);

  return this.authRepository.getCurrentUser().pipe(
    tap((user) => {
      this.authStore.setCurrentUser(user);
      this.authUserStorageService.setUser(user);
    }),
    map(() => true),
    catchError(() => {
      this.clearSession();
      return of(false);
    }),
    finalize(() => {
      this.authStore.setInitialized(true);
      this.authStore.setLoading(false);
    })
  );
}
private clearSession(): void {
  this.authTokenService.clear();
  this.authUserStorageService.clear();
  this.authStore.clear();
}

  private handleLoginSuccess(authUser: AuthUserModel, rememberMe: boolean): void {
    this.authTokenService.setToken(authUser.token, rememberMe);

    const currentUser: CurrentUserModel = {
      userId: authUser.userId,
      email: authUser.email,
      fullNameAr: authUser.fullNameAr,
      fullNameEn: authUser.fullNameEn,
      gender: authUser.gender,
      isProfileCompleted: authUser.isProfileCompleted,
      roles: authUser.roles,
      dateOfBirth: authUser.dateOfBirth,
      bloodType: authUser.bloodType,
      branchId: authUser.branchId,
      hospitalId: authUser.hospitalId,
    };

    this.authStore.setCurrentUser(currentUser);
    this.authUserStorageService.setUser(currentUser);
  }

  private redirectAfterCitizenLogin(
    authUser: AuthUserModel,
    returnUrl: string | null
  ): void {
    if (!authUser.isProfileCompleted) {
      this.router.navigate(['/user/screening'], {
        queryParams: {
          sessionType: ScreeningSessionType.Registration,
          isForFemaleOnly: authUser.gender === GenderEnum.Female
        },
        replaceUrl: true
      });
      return;
    }

    this.router.navigateByUrl(returnUrl || '/user/dashboard',{
       replaceUrl: true
    });
  }

private redirectAfterStaffLogin(authUser: AuthUserModel): void {
  const roles = authUser.roles;

  if (roles.includes(UserRole.Admin)) {
    this.router.navigateByUrl('/admin/dashboard' , {
       replaceUrl: true
    });
    return;
  }

  if (roles.includes(UserRole.BranchManager)) {
    this.router.navigateByUrl('/branch-manager/dashboard' , {
       replaceUrl: true
    });
    return;
  }

  if (roles.includes(UserRole.Employee)) {
    this.router.navigateByUrl('/staff/dashboard' , {
       replaceUrl: true
    });
    return;
  }

  if (roles.includes(UserRole.Doctor)) {
    this.router.navigateByUrl('/doctor/dashboard' , {
       replaceUrl: true
    });
    return;
  }
   this.router.navigateByUrl('/unauthorized', { replaceUrl: true });
}

private mapLoginErrorToMessage(error: Failure): string {
  switch (error.code) {
    case 'AUTH_INVALID_CREDENTIALS':
      return this.translate.instant('Login-Keys.INVALID_CREDENTIALS');

    case 'AUTH_ACCOUNT_INACTIVE':
      return this.translate.instant('Login-Keys.INACTIVE_ACCOUNT');

    default:
      return this.translate.instant('Login-Keys.GENERIC_ERROR_LOGIN');
  }
}

private mapRegisterErrorToMessage(error: Failure): string {
  switch (error.code) {
    case 'NON_JORDANIAN_CITIZEN':
      return this.translate.instant('Signup-Keys.NON_JORDANIAN_CITIZEN');

    case 'EMAIL_ALREADY_REGISTERED':
      return this.translate.instant('Signup-Keys.EMAIL_ALREADY_REGISTERED');

    case 'NATIONAL_ID_ALREADY_REGISTERED':
      return this.translate.instant('Signup-Keys.NATIONAL_ID_ALREADY_REGISTERED');

    case 'NATIONAL_ID_NOT_FOUND':
      return this.translate.instant('Signup-Keys.NATIONAL_ID_NOT_FOUND');

    case 'VALIDATION_ERROR':
    case 'REGISTRATION_FAILED':
    case 'ROLE_ASSIGNMENT_FAILED':
      return this.translate.instant('Signup-Keys.GENERIC_ERROR_SIGNUP');

    default:
      return this.translate.instant('Signup-Keys.GENERIC_ERROR_SIGNUP');
  }
}
private mapForgotPasswordErrorToMessage(error: Failure): string {
  switch (error.code) {
    case 'EMAIL_SENDING_FAILED':
      return this.translate.instant('ForgotPassword-Keys.EMAIL_SENDING_FAILED');

    default:
      return this.translate.instant('ForgotPassword-Keys.GENERIC_ERROR');
  }
}

private mapVerifyOtpErrorToMessage(error: Failure): string {
  switch (error.code) {
    case 'INVALID_OTP':
      return this.translate.instant('ResetOtp-Keys.INVALID_OTP');

    case 'OTP_EXPIRED':
      return this.translate.instant('ResetOtp-Keys.OTP_EXPIRED');

    case 'INVALID_OR_EXPIRED_OTP':
      return this.translate.instant('ResetOtp-Keys.INVALID_OR_EXPIRED_OTP');

    case 'OTP_TOO_MANY_ATTEMPTS':
      return this.translate.instant('ResetOtp-Keys.OTP_TOO_MANY_ATTEMPTS');

    default:
      return this.translate.instant('ResetOtp-Keys.GENERIC_ERROR');
  }
}

private mapResetPasswordErrorToMessage(error: Failure): string {
  switch (error.code) {
    case 'PASSWORD_CONFIRMATION_MISMATCH':
      return this.translate.instant('ResetPassword-Keys.PASSWORDS_DO_NOT_MATCH');

    case 'INVALID_PASSWORD_RESET_REQUEST':
      return this.translate.instant('ResetPassword-Keys.INVALID_PASSWORD_RESET_REQUEST');

    case 'PASSWORD_RESET_SESSION_EXPIRED':
      return this.translate.instant('ResetPassword-Keys.PASSWORD_RESET_SESSION_EXPIRED');

    case 'PASSWORD_RESET_FAILED':
      return this.translate.instant('ResetPassword-Keys.PASSWORD_RESET_FAILED');

    default:
      return this.translate.instant('ResetPassword-Keys.GENERIC_ERROR');
  }
}

}
