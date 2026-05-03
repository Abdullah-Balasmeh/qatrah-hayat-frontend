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
import { mapRegisterErrorToMessage } from '../../../../core/errors/register-error-to-message.mapper';
import { mapForgotPasswordErrorToMessage, mapLoginErrorToMessage, mapResetPasswordErrorToMessage, mapVerifyOtpErrorToMessage } from '../../../../core/errors/login-error-to-message.mapper';

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

   /**
   * Registers a citizen.
   */
  registerCitizen(
  request: RegisterRequestModel
): Observable<RegisterResponseModel> {
  this.authStore.setLoading(true);
  this.authStore.setError(null);

  return this.authRepository.register(request).pipe(
    catchError((error: Failure) => {
      const message = mapRegisterErrorToMessage(error , this.translate);
      this.authStore.setError(message);
      return throwError(() => new Error(message));
    }),
    finalize(() => this.authStore.setLoading(false))
  );
}
  /**
   * Checks if the current user has any of the specified roles.
   */
   hasRole(roles: UserRole[]): boolean {
    return this.authStore.hasRole(roles);
  }
  /**
   * Logs in a citizen.
   */
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
        const message = mapLoginErrorToMessage(error, this.translate);
        this.authStore.setError(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.authStore.setLoading(false))
    );
  }

  /**
   * Logs in a staff member.
   */
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
        const message = mapLoginErrorToMessage(error , this.translate);
        this.authStore.setError(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.authStore.setLoading(false))
    );
  }
  /**
   * Logs out a citizen.
   */
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
  /**
   * Sends a password reset email.
   */
  forgotPassword(request: ForgotPasswordRequestModel): Observable<void> {
  this.authStore.setLoading(true);
  this.authStore.setError(null);

  return this.authRepository.forgotPassword(request).pipe(
    catchError((error: Failure) => {
      const message = mapForgotPasswordErrorToMessage(error , this.translate);
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
      const message = mapVerifyOtpErrorToMessage(error , this.translate);
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
      const message = mapResetPasswordErrorToMessage(error , this.translate);
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
    this.authUserStorageService.setUser(currentUser, rememberMe);
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

}
