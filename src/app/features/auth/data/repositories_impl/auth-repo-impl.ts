import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { LoginRequestModel } from '../../domain/models/login-request.model';
import { RegisterRequestModel } from '../../domain/models/register-request.model';
import { CurrentUserModel } from '../../domain/models/current-user.model';

import { AuthApiService } from '../services/auth-api.service';
import { mapLoginRequestModelToLoginRequestDto } from '../mappers/login-request-model-to-login-request-dto.mapper';
import { AuthRepo } from '../../domain/repositories/auth.repo';
import { AuthUserModel } from '../../domain/models/auth-user.model';
import { mapAuthResponseDtoToAuthUserModel } from '../mappers/auth-response-dto-to-auth-user-model.mapper';
import { mapCurrentUserDtoToCurrentUserModel } from '../mappers/current-user-dto-to-current-user-model.mapper';
import { mapRegisterRequestModelToRegisterRequestDto } from '../mappers/register-request-model-to-register-request-dto.mapper';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryImpl implements AuthRepo {
  private readonly api = inject(AuthApiService);

  login(request: LoginRequestModel): Observable<AuthUserModel> {
    const dto = mapLoginRequestModelToLoginRequestDto(request);

    return this.api.login(dto).pipe(
      map(mapAuthResponseDtoToAuthUserModel)
    );
  }

  register(request: RegisterRequestModel): Observable<AuthUserModel> {
    const dto = mapRegisterRequestModelToRegisterRequestDto(request);

    return this.api.signUp(dto).pipe(
      map(mapAuthResponseDtoToAuthUserModel)
    );
  }

  getCurrentUser(): Observable<CurrentUserModel> {
    return this.api.getCurrentUser().pipe(
      map(mapCurrentUserDtoToCurrentUserModel)
    );
  }
}
