import { Routes } from '@angular/router';

import { ScreeningApiService } from './data/services/screening-api.service';
import { ScreeningRepositoryImpl } from './data/repositories_impl/screening-repository-impl';
import { ScreeningRepository } from './domain/repositories/screening.repository';
import { ScreeningFacade } from './presentation/facades/screening.facade';
import { ScreeningStore } from './presentation/store/screening.store';

export const SCREENING_ROUTES: Routes = [
  {
    path: '',
    providers: [
      ScreeningApiService,
      ScreeningRepositoryImpl,
      {
        provide: ScreeningRepository,
        useClass: ScreeningRepositoryImpl
      },
      ScreeningStore,
      ScreeningFacade
    ],
    loadComponent: () =>
      import('./presentation/pages/screening-page/screening-page.component')
        .then(c => c.ScreeningPageComponent)
  }
];
