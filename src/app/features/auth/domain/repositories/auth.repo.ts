import { Observable } from 'rxjs';
import { CurrentUserModel } from '../models/current-user.model';
import { LoginRequestModel } from '../models/login-request.model';
import { RegisterRequestModel } from '../models/register-request.model';
import { AuthUserModel } from '../models/auth-user.model';
import { RegisterResponseModel } from '../models/register-response.model';

export abstract class AuthRepo {
  abstract login(request: LoginRequestModel): Observable<AuthUserModel>;
  abstract register(request: RegisterRequestModel): Observable<RegisterResponseModel>;
  abstract getCurrentUser(): Observable<CurrentUserModel>;
}
