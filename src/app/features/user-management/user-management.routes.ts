import { Routes } from '@angular/router';
import { UsersManagementRepository } from './domain/repositories/users-management.repository';
import { UsersManagementRepositoryImpl } from './data/repositories_impl/users-management.repository.impl';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    providers: [
      {
        provide: UsersManagementRepository,
        useClass: UsersManagementRepositoryImpl
      }
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/pages/all-users-page/all-users-page.component')
            .then(c => c.AllUsersPageComponent)
      },
      {
        path: 'staff/add',
        loadComponent: () =>
          import('./presentation/pages/add-staff-page/add-staff-page.component')
            .then(c => c.AddStaffPageComponent)
      },
      // {
      //   path: 'staff/:id',
      //   loadComponent: () =>
      //     import('./presentation/pages/staff-details-page/staff-details-page.component')
      //       .then(c => c.StaffDetailsPageComponent)
      // },
      // {
      //   path: 'staff/:id/edit',
      //   loadComponent: () =>
      //     import('./presentation/pages/edit-staff-page/edit-staff-page.component')
      //       .then(c => c.EditStaffPageComponent)
      // },
      // {
      //   path: 'citizens/:id',
      //   loadComponent: () =>
      //     import('./presentation/pages/citizen-details-page/citizen-details-page.component')
      //       .then(c => c.CitizenDetailsPageComponent)
      // },
      // {
      //   path: 'citizens/:id/edit',
      //   loadComponent: () =>
      //     import('./presentation/pages/edit-citizen-page/edit-citizen-page.component')
      //       .then(c => c.EditCitizenPageComponent)
      // }
    ]
  }
];
