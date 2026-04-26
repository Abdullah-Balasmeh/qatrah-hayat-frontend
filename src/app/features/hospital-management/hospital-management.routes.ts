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
      // {
      //   path: 'branch/:id',
      //   loadComponent: () =>
      //     import('./presentation/pages/branch-details-page/branch-details-page.component')
      //       .then(c => c.BranchDetailsPageComponent)
      // },
      // {
      //   path: 'branch/:id/edit',
      //   loadComponent: () =>
      //     import('./presentation/pages/edit-branch-page/edit-branch-page.component')
      //       .then(c => c.EditBranchPageComponent)
      // },

    ]
  }
];
