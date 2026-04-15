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
  loginCitizen(
    request: LoginRequestModel,
    returnUrl: string | null
  ): Observable<void> {
    this.authStore.setLoading(true);
    this.authStore.setError(null);

    return this.authRepository.login(request).pipe(
      tap((authUser) => this.handleAuthSuccess(authUser)),
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
      this.logout(false);
      return of(false);
    }),
    finalize(() => {
      this.authStore.setInitialized(true);
      this.authStore.setLoading(false);
    })
  );
}

  logout(redirectToLogin = true): void {
    this.authTokenService.clear();
    this.authUserStorageService.clear();
    this.authStore.clear();

    if (redirectToLogin) {
      this.router.navigate(['/auth/login']);
    }
  }

  private handleAuthSuccess(authUser: AuthUserModel): void {
    this.authTokenService.setToken(authUser.token);

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
        }
      });
      return;
    }

    this.router.navigateByUrl(returnUrl || '/user/dashboard');
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

  hasRole(roles: UserRole[]): boolean {
    return this.authStore.hasRole(roles);
  }
}
