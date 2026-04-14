import { Injectable, computed, signal } from '@angular/core';
import { CurrentUserModel } from '../../../../core/enums/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly _currentUser = signal<CurrentUserModel | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly role = computed(() => this._currentUser()?.role ?? null);
  readonly fullNameAr = computed(() => this._currentUser()?.fullNameAr ?? '');
  readonly fullNameEn = computed(() => this._currentUser()?.fullNameEn ?? '');
  readonly isProfileCompleted = computed(() => this._currentUser()?.isProfileCompleted ?? false);

  setCurrentUser(user: CurrentUserModel | null): void {
    this._currentUser.set(user);
  }

  clear(): void {
    this._currentUser.set(null);
  }
}
