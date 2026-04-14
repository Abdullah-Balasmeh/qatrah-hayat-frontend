import { Injectable, computed, signal } from '@angular/core';
import { CurrentUserModel } from '../../domain/models/current-user.model';
import { UserRole } from '../../../../core/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly _currentUser = signal<CurrentUserModel | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _initialized = signal(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly initialized = this._initialized.asReadonly();

  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly role = computed(() => this._currentUser()?.roles ?? []);
  readonly fullNameAr = computed(() => this._currentUser()?.fullNameAr ?? '');
  readonly fullNameEn = computed(() => this._currentUser()?.fullNameEn ?? '');
  readonly isProfileCompleted = computed(
    () => this._currentUser()?.isProfileCompleted ?? false
  );

  setCurrentUser(user: CurrentUserModel | null): void {
    this._currentUser.set(user);
  }

  setLoading(value: boolean): void {
    this._loading.set(value);
  }

  setError(message: string | null): void {
    this._error.set(message);
  }

  setInitialized(value: boolean): void {
    this._initialized.set(value);
  }

  hasRole(roles: UserRole[]): boolean {
    return this._currentUser()?.roles.some((role) => roles.includes(role)) ?? false;
  }

  clear(): void {
    this._currentUser.set(null);
    this._loading.set(false);
    this._error.set(null);
    this._initialized.set(true);
  }
}
