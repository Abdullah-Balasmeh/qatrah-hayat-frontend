import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthFacade } from '../../features/auth/presentation/facades/auth.facade';
import { UserRole } from '../enums/user-role.enum';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as UserRole[] | undefined;

  if (!authFacade.isLoggedIn()) {
    const loginUrl = allowedRoles?.includes(UserRole.Citizen)
      ? '/auth/login'
      : '/auth/staff-login';

    return router.createUrlTree([loginUrl], {
      queryParams: {
        returnUrl: state.url
      }
    });
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  if (!authFacade.hasRole(allowedRoles)) {
    return router.createUrlTree(['/unauthorized']);
  }

  return true;
};
