import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { AuthStateService } from './auth-state.service';
import { AuthUserStorageService } from './auth-user-storage.service';
import { mapAuthResponseToCurrentUser } from '../mappers/map-auth-response-to-current-user.mapper';
import { AuthTokenService } from '../../../../core/services/auth-token.service';
import { CurrentUserModel } from '../../../../core/enums/current-user.model';
import { AuthResponseDto } from '../dots/auth-response.dto';
import { LoginRequestDto } from '../dots/login-request.dto';
import { RegisterRequestDto } from '../dots/register-request.dto';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly tokenService = inject(AuthTokenService);
  private readonly authStateService = inject(AuthStateService);
  private readonly authUserStorageService = inject(AuthUserStorageService);

  private readonly registerUrl = API_ENDPOINTS.auth.register;
  private readonly loginUrl = API_ENDPOINTS.auth.login;
  private readonly currentUserUrl = API_ENDPOINTS.auth.me;

  signUp(request: RegisterRequestDto): Observable<AuthResponseDto> {
    return this.api.post<RegisterRequestDto, AuthResponseDto>(
      this.registerUrl,
      request
    );
  }

  login(request: LoginRequestDto): Observable<AuthResponseDto> {
    return this.api.post<LoginRequestDto, AuthResponseDto>(
      this.loginUrl,
      request
    ).pipe(
      tap((response) => {
        this.tokenService.setToken(response.token);

        const user = mapAuthResponseToCurrentUser(response);
        this.authStateService.setCurrentUser(user);
        this.authUserStorageService.setUser(user);
      })
    );
  }

  getCurrentUser(): Observable<AuthResponseDto> {
    return this.api.get<AuthResponseDto>(this.currentUserUrl);
  }
  restoreUserFromStorage(): void {
    const token = this.tokenService.getToken();
    const user = this.authUserStorageService.getUser();

    if (token && user) {
      this.authStateService.setCurrentUser(user);
    }
  }

  setCurrentUser(user: CurrentUserModel): void {
    this.authStateService.setCurrentUser(user);
    this.authUserStorageService.setUser(user);
  }

  logout(): void {
    this.tokenService.clear();
    this.authUserStorageService.clear();
    this.authStateService.clear();

  }
}
