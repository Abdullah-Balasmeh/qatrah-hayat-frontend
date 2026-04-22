import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private readonly tokenKey = 'qatrah_hayat_token';

  setToken(token: string, rememberMe: boolean): void {
    this.clear();

    if (rememberMe) {
      localStorage.setItem(this.tokenKey, token);
      return;
    }

    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.tokenKey) ||
      sessionStorage.getItem(this.tokenKey)
    );
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  clear(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }
}
