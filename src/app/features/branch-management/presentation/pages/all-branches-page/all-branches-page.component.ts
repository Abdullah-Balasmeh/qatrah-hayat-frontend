import { Component, OnInit, inject } from '@angular/core';

import { BranchesPageHeaderComponent } from '../../components/branches-page-header/branches-page-header.component';
import { BranchesStatisticsSectionComponent } from '../../components/branches-statistics-section/branches-statistics-section.component';
import {
  BranchesFiltersComponent,
  BranchStatusFilter
} from '../../components/branches-filters/branches-filters.component';

import { BranchesTableComponent } from '../../components/branches-table/branches-table.component';

import { AlertErrorComponent } from '../../../../../shared/ui/alert-error/alert-error.component';
import { LoadingComponent } from '../../../../../shared/ui/loading/loading.component';
import { ConfirmationModalComponent } from '../../../../../shared/ui/confirmation-modal/confirmation-modal.component';

import { BranchManagementFacade } from '../../facades/branch-management.facade';
import { UsersPaginationComponent } from "../../../../user-management/presentation/components/users-pagination/users-pagination.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-branches-page',
  imports: [
    BranchesPageHeaderComponent,
    BranchesStatisticsSectionComponent,
    BranchesFiltersComponent,
    AlertErrorComponent,
    LoadingComponent,
    BranchesTableComponent,
    ConfirmationModalComponent,
    UsersPaginationComponent,
    TranslateModule
],
  templateUrl: './all-branches-page.component.html',
  styleUrl: './all-branches-page.component.css'
})
export class AllBranchesPageComponent implements OnInit {
  readonly facade = inject(BranchManagementFacade);
  readonly store = this.facade.store;

  ngOnInit(): void {
    this.facade.loadInitialData();
  }

  onSearchValueChange(value: string): void {
    this.facade.updateSearchValue(value);
  }

  onSearch(): void {
    this.facade.searchBranches();
  }

  onStatusChange(value: BranchStatusFilter): void {
    this.facade.updateStatusFilter(value);
  }

  previousPage(): void {
    this.facade.previousPage();
  }

  nextPage(): void {
    this.facade.nextPage();
  }

  openActivateConfirmation(branchId: number): void {
    this.facade.openActivateConfirmation(branchId);
  }

  openDeactivateConfirmation(branchId: number): void {
    this.facade.openDeactivateConfirmation(branchId);
  }

  openDeleteConfirmation(branchId: number): void {
    this.facade.openDeleteConfirmation(branchId);
  }

  confirmBranchAction(): void {
    this.facade.confirmBranchAction();
  }

  closeConfirmationModal(): void {
    this.facade.closeConfirmationModal();
  }
}
