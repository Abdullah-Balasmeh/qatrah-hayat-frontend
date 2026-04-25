import { Routes } from '@angular/router';
import { BranchManagementRepositoryImpl } from './data/repositories_impl/branch-management.repository.impl';
import { BranchManagementRepository } from './domain/repositories/branch-management.repository';
import { BranchManagementFacade } from './presentation/facades/branch-management.facade';
import { BranchManagementStore } from './presentation/store/branch-management.store';

export const BRANCH_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
      providers: [
      BranchManagementStore,
      BranchManagementFacade,
      {
        provide: BranchManagementRepository,
        useClass: BranchManagementRepositoryImpl
      }
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/pages/all-branches-page/all-branches-page.component')
            .then(c => c.AllBranchesPageComponent)
      },
      {
        path: 'branch/add',
        loadComponent: () =>
          import('./presentation/pages/add-branch-page/add-branch-page.component')
            .then(c => c.AddBranchPageComponent)
      },
      {
        path: 'branch/:id',
        loadComponent: () =>
          import('./presentation/pages/branch-details-page/branch-details-page.component')
            .then(c => c.BranchDetailsPageComponent)
      },
      {
        path: 'branch/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/edit-branch-page/edit-branch-page.component')
            .then(c => c.EditBranchPageComponent)
      },

    ]
  }
];
