import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthStore } from '../../features/auth/presentation/store/auth.store';

export const authGuard: CanActivateFn = (
  route,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], {
    queryParams: {
      returnUrl: state.url
    }
  });
};
