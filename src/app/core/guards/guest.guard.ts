import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { AuthStore } from '../../features/auth/presentation/store/auth.store';
import { UserRole } from '../enums/user-role.enum';

export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isLoggedIn()) {
    return true;
  }

  const roles = authStore.roles();

  if (roles.includes(UserRole.Admin)) {
    return router.createUrlTree(['/admin/dashboard']);
  }

  if (roles.includes(UserRole.BranchManager)) {
    return router.createUrlTree(['/branch-manager/dashboard']);
  }

  if (roles.includes(UserRole.Employee)) {
    return router.createUrlTree(['/staff/dashboard']);
  }

  if (roles.includes(UserRole.Doctor)) {
    return router.createUrlTree(['/doctor/dashboard']);
  }

  if (roles.includes(UserRole.Citizen)) {
    return router.createUrlTree(['/user/dashboard']);
  }

  return router.createUrlTree(['/']);
};
