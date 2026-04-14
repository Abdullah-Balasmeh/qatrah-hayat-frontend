import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { AuthTokenService } from '../services/auth-token.service';
import { AuthStore } from '../../features/auth/presentation/store/auth.store';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const tokenService = inject(AuthTokenService);
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const hasToken = tokenService.hasToken();
  const isLoggedIn = authStore.isLoggedIn();

  if (hasToken || isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
