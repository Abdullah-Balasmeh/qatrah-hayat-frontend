import { Routes } from '@angular/router';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
      {
        path: 'users',
        loadComponent: () =>
          import('./presentation/pages/users-page/users-page.component')
            .then(c => c.UsersPageComponent),
      },
      {
        path: 'add-user',
        loadComponent: () =>
          import('./presentation/pages/add-user-page/add-user-page.component')
            .then(c => c.AddUserPageComponent),
      },
      {
        path: 'users/:id',
        loadComponent: () =>
          import('./presentation/pages/user-details-page/user-details-page.component')
            .then(c => c.UserDetailsPageComponent),
      },
      {
        path: 'users/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/edit-user-page/edit-user-page.component')
            .then(c => c.EditUserPageComponent),
      }
];
