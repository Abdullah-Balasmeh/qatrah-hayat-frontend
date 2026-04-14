import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./presentation/pages/citizen-sign-up-page/citizen-sign-up-page.component')
        .then(c => c.CitizenSignUpPage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./presentation/pages/citizen-login-page/citizen-login-page.component')
        .then(c => c.CitizenLoginPage)
  },
  {
    path: 'staff-login',
    loadComponent: () =>
      import('./presentation/pages/staff-login-page/staff-login-page.component')
        .then(c => c.StaffLoginPage)
  }
];
