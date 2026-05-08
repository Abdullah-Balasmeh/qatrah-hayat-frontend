import { Routes } from '@angular/router';

import { BranchManagementRepositoryImpl } from '../branch-management/data/repositories_impl/branch-management.repository.impl';
import { BranchManagementRepository } from '../branch-management/domain/repositories/branch-management.repository';

import { HospitalManagementRepositoryImpl } from './data/repositories_impl/hospital-management.repository.impl';
import { HospitalManagementRepository } from './domain/repositories/hospital-management.repository';
import { HospitalManagementFacade } from './presentation/facades/hospital-management.facade';
import { HospitalManagementStore } from './presentation/store/hospital-management.store';

export const HOSPITAL_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    providers: [
      HospitalManagementStore,
      HospitalManagementFacade,
      {
        provide: HospitalManagementRepository,
        useClass: HospitalManagementRepositoryImpl
      },
      {
        provide: BranchManagementRepository,
        useClass: BranchManagementRepositoryImpl
      }
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/pages/all-hospitals-page/all-hospitals-page.component')
            .then(c => c.AllHospitalsPageComponent)
      },
      {
        path: 'hospital/add',
        loadComponent: () =>
          import('./presentation/pages/add-hospital-page/add-hospital-page.component')
            .then(c => c.AddHospitalPageComponent)
      },
      {
        path: 'hospital/:id',
        loadComponent: () =>
          import('./presentation/pages/hospital-details-page/hospital-details-page.component')
            .then(c => c.HospitalDetailsPageComponent)
      },
      {
        path: 'hospital/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/edit-hospital-page/edit-hospital-page.component')
            .then(c => c.EditHospitalPageComponent)
      }
    ]
  }
];
