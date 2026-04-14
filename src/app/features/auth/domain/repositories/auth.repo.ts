import { Observable } from 'rxjs';
import { CurrentUserModel } from '../models/current-user.model';
import { LoginRequestModel } from '../models/login-request.model';
import { RegisterRequestModel } from '../models/register-request.model';
import { AuthUserModel } from '../models/auth-user.model';

export abstract class AuthRepo {
  abstract login(request: LoginRequestModel): Observable<AuthUserModel>;
  abstract register(request: RegisterRequestModel): Observable<AuthUserModel>;
  abstract getCurrentUser(): Observable<CurrentUserModel>;
}
