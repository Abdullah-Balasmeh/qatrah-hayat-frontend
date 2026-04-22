import { Injectable } from '@angular/core';
import { CurrentUserModel } from '../../domain/models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthUserStorageService {
  private readonly userKey = 'qatrah_hayat_current_user';

  setUser(user: CurrentUserModel, rememberMe = true): void {
    this.clear();

    const serializedUser = JSON.stringify(user);

    if (rememberMe) {
      localStorage.setItem(this.userKey, serializedUser);
      return;
    }

    sessionStorage.setItem(this.userKey, serializedUser);
  }

  getUser(): CurrentUserModel | null {
    const serializedUser =
      localStorage.getItem(this.userKey) ||
      sessionStorage.getItem(this.userKey);

    if (!serializedUser) {
      return null;
    }

    try {
      return JSON.parse(serializedUser) as CurrentUserModel;
    } catch {
      this.clear();
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.userKey);
  }
}
