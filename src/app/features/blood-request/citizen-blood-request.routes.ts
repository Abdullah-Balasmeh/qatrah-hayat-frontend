import { Routes } from '@angular/router';

import { HospitalManagementRepositoryImpl } from '../hospital-management/data/repositories_impl/hospital-management.repository.impl';
import { HospitalManagementRepository } from '../hospital-management/domain/repositories/hospital-management.repository';

import { BloodRequestRepositoryImpl } from './data/repositories_impl/blood-request.repository.impl';
import { BloodRequestRepository } from './domain/repositories/blood-request.repository';
import { BloodRequestFacade } from './presentation/facades/blood-request.facade';
import { BloodRequestStore } from './presentation/store/blood-request.store';

export const CITIZEN_BLOOD_REQUEST_ROUTES: Routes = [
  {
    path: '',
    providers: [
      BloodRequestStore,
      BloodRequestFacade,
      {
        provide: BloodRequestRepository,
        useClass: BloodRequestRepositoryImpl
      },
      {
        provide: HospitalManagementRepository,
        useClass: HospitalManagementRepositoryImpl
      }
    ],
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./presentation/pages/citizen-create-blood-request-page/citizen-create-blood-request-page.component')
            .then(c => c.CitizenCreateBloodRequestPageComponent)
      },
      {
        path: 'create/self',
        loadComponent: () =>
          import('./presentation/pages/create-self-blood-request-page/create-self-blood-request-page.component')
            .then(c => c.CreateSelfBloodRequestPageComponent)
      },
      {
        path: 'create/other',
        loadComponent: () =>
          import('./presentation/pages/create-other-blood-request-page/create-other-blood-request-page.component')
            .then(c => c.CreateOtherBloodRequestPageComponent)
      }
      // {
      //   path: 'my',
      //   loadComponent: () =>
      //     import('./presentation/pages/citizen-my-blood-requests-page/citizen-my-blood-requests-page.component')
      //       .then(c => c.CitizenMyBloodRequestsPageComponent)
      // },
      // {
      //   path: 'doctor',
      //   loadComponent: () =>
      //     import('./presentation/pages/doctor-blood-requests-page/doctor-blood-requests-page.component')
      //       .then(c => c.DoctorBloodRequestsPageComponent)
      // },
      // {
      //   path: 'branch',
      //   loadComponent: () =>
      //     import('./presentation/pages/branch-blood-requests-page/branch-blood-requests-page.component')
      //       .then(c => c.BranchBloodRequestsPageComponent)
      // },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./presentation/pages/blood-request-details-page/blood-request-details-page.component')
      //       .then(c => c.BloodRequestDetailsPageComponent)
      // },
      // {
      //   path: ':id/doctor-review',
      //   loadComponent: () =>
      //     import('./presentation/pages/doctor-review-blood-request-page/doctor-review-blood-request-page.component')
      //       .then(c => c.DoctorReviewBloodRequestPageComponent)
      // },
      // {
      //   path: ':id/employee-review',
      //   loadComponent: () =>
      //     import('./presentation/pages/employee-review-blood-request-page/employee-review-blood-request-page.component')
      //       .then(c => c.EmployeeReviewBloodRequestPageComponent)
      // }
    ]
  }
];
