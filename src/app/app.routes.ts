import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { guestGuard } from './core/guards/guest.guard';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/landing/presentation/pages/landing-page/landing-page.component')
            .then(c => c.LandingPageComponent),
      }
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/presentation/pages/admin-dashboard/admin-dashboard.component')
            .then(c => c.AdminDashboardComponent),
      }
    ]
  },

  {
    path: '404',
    loadComponent: () =>
      import('./shared/components/not-found-page/not-found-page.component')
        .then(c => c.NotFoundPageComponent)
  },

  {
    path: '**',
    redirectTo: '404'
  }
];
