import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { CurrentUserDto } from '../dtos/current-user.dto';



@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly api = inject(ApiService);

  private readonly registerUrl = API_ENDPOINTS.auth.register;
  private readonly loginUrl = API_ENDPOINTS.auth.login;
  private readonly currentUserUrl = API_ENDPOINTS.auth.me;


  login(request: LoginRequestDto): Observable<AuthResponseDto> {
    return this.api.post<LoginRequestDto, AuthResponseDto>(
      this.loginUrl,
      request
    );
  }

  signUp(request: RegisterRequestDto): Observable<AuthResponseDto> {
    return this.api.post<RegisterRequestDto, AuthResponseDto>(
      this.registerUrl,
      request
    );
  }

  getCurrentUser(): Observable<CurrentUserDto> {
    return this.api.get<CurrentUserDto>(this.currentUserUrl);
  }
}
