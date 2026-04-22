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
  },

  {
  path: 'forgot-password',
  loadComponent: () =>
    import('./presentation/pages/forgot-password-page/forgot-password-page.component')
      .then(c => c.ForgotPasswordPageComponent)
},
{
  path: 'verify-reset-otp',
  loadComponent: () =>
    import('./presentation/pages/verify-otp-page/verify-otp-page.component')
      .then(c => c.VerifyOTPPageComponent)
},
{
  path: 'reset-password',
  loadComponent: () =>
    import('./presentation/pages/reset-password-page/reset-password-page.component')
      .then(c => c.ResetPasswordPageComponent)
}
];
