import { Routes } from '@angular/router';
import { UsersManagementRepository } from './domain/repositories/users-management.repository';
import { UsersManagementRepositoryImpl } from './data/repositories_impl/users-management.repository.impl';
import { UsersManagementStore } from './presentation/store/users-management.store';
import { UsersManagementFacade } from './presentation/facades/users-management.facade';
import { BranchManagementRepositoryImpl } from '../branch-management/data/repositories_impl/branch-management.repository.impl';
import { BranchManagementRepository } from '../branch-management/domain/repositories/branch-management.repository';
import { HospitalManagementRepositoryImpl } from '../hospital-management/data/repositories_impl/hospital-management.repository.impl';
import { HospitalManagementRepository } from '../hospital-management/domain/repositories/hospital-management.repository';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    providers: [
      UsersManagementStore,
      UsersManagementFacade,
      {
        provide: UsersManagementRepository,
        useClass: UsersManagementRepositoryImpl
      },
      {
        provide: BranchManagementRepository,
        useClass: BranchManagementRepositoryImpl
      },
      {
        provide: HospitalManagementRepository,
        useClass: HospitalManagementRepositoryImpl
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
      {
        path: 'staff/:id',
        loadComponent: () =>
          import('./presentation/pages/staff-details-page/staff-details-page.component')
            .then(c => c.StaffDetailsPageComponent)
      },
      {
        path: 'staff/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/edit-staff-page/edit-staff-page.component')
            .then(c => c.EditStaffPageComponent)
      },
      {
        path: 'citizens/:id',
        loadComponent: () =>
          import('./presentation/pages/citizen-details-page/citizen-details-page.component')
            .then(c => c.CitizenDetailsPageComponent)
      },
      {
        path: 'citizens/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/edit-citizen-page/edit-citizen-page.component')
            .then(c => c.EditCitizenPageComponent)
      }
    ]
  }
];
