import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { guestGuard } from './core/guards/guest.guard';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { UserRole } from './core/enums/user-role.enum';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    canActivate: [guestGuard],
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
    canActivate: [roleGuard],
    data: {
      roles: [UserRole.Admin]
    },
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
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/user-management/user-management.routes').then(r => r.USER_MANAGEMENT_ROUTES)
      },
      {
        path: 'branches',
        loadChildren: () =>
          import('./features/branch-management/branch-management.routes').then(r => r.BRANCH_MANAGEMENT_ROUTES)
      },
      {
        path: 'hospitals',
        loadChildren: () =>
          import('./features/hospital-management/hospital-management.routes').then(r => r.HOSPITAL_MANAGEMENT_ROUTES)
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
