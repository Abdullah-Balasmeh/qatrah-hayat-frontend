import { Injectable } from '@angular/core';
import { CurrentUserModel } from '../../domain/models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthUserStorageService {
  private readonly userKey = 'current_user';

  setUser(user: CurrentUserModel): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): CurrentUserModel | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as CurrentUserModel;
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.userKey);
  }
}
