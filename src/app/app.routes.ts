import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { guestGuard } from './core/guards/guest.guard';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { UserRole } from './core/enums/user-role.enum';
import { roleGuard } from './core/guards/role.guard';
import { CitizenLayoutComponent } from './core/layouts/citizen-layout/citizen-layout.component';

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
    path: 'user',
    component: CitizenLayoutComponent,
    canActivate: [roleGuard],
    data: {
      roles: [UserRole.Citizen]
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
          import('./features/dashboard/presentation/pages/user-dashboard/user-dashboard.component')
            .then(c => c.UserDashboardComponent),
      },
      {
        path: 'donate',
        loadComponent: () => import('./features/donation/presentation/pages/donate-page/donate-page.component')
          .then(c => c.DonatePageComponent)
      },
      {
        path: 'screening',
        loadChildren: () =>
          import('./features/screening/screening.routes').then(r => r.SCREENING_ROUTES)
      },

      // {
      //   path: 'requests',
      //   loadChildren: () =>
      //     import('./features/request/request.routes').then(r => r.REQUEST_ROUTES)
      // },
      // {
      //   path: 'requests/new',
      //   loadChildren: () =>
      //     import('./features/request/request.routes').then(r => r.REQUEST_ROUTES)
      // },
      // {
      //   path: 'requests/:id',
      //   loadChildren: () =>
      //     import('./features/request/request.routes').then(r => r.REQUEST_ROUTES)
      // },
      // {
      //   path: 'campaigns',
      //   loadChildren: () =>
      //     import('./features/campaign/campaign.routes').then(r => r.CAMPAIGN_ROUTES)
      // },
      // {
      //   path: 'campaigns/new',
      //   loadChildren: () =>
      //     import('./features/campaign/campaign.routes').then(r => r.CAMPAIGN_ROUTES)
      // },
      // {
      //   path: 'campaigns/:id',
      //   loadChildren: () =>
      //     import('./features/campaign/campaign.routes').then(r => r.CAMPAIGN_ROUTES)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () =>
      //     import('./features/notification/notification.routes').then(r => r.NOTIFICATION_ROUTES)
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () =>
      //     import('./features/user/user.routes').then(r => r.USER_ROUTES)
      // },

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
