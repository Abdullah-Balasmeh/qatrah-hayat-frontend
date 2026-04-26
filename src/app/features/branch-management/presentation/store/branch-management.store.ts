import { computed, Injectable, signal } from '@angular/core';

import { BranchResponseModel } from '../../domain/models/branch-response.model';
import { BranchStatusFilter } from '../components/branches-filters/branches-filters.component';
import { AvailableBranchManagerModel } from '../../domain/models/available-branch-manager.model';

@Injectable()
export class BranchManagementStore {
  // ============================================================
  // Data State
  // ============================================================

  readonly branches = signal<BranchResponseModel[]>([]);
  readonly selectedBranch = signal<BranchResponseModel | null>(null);

  // ============================================================
  // Statistics State
  // ============================================================

  readonly totalBranches = signal(0);
  readonly totalActiveBranches = signal(0);
  readonly totalInactiveBranches = signal(0);
  readonly lastUpdate = signal<string | null>(null);

  // ============================================================
  // Filters State
  // ============================================================

  readonly searchValue = signal('');
  readonly selectedStatus = signal<BranchStatusFilter>('all');

  // ============================================================
  // Pagination State
  // ============================================================

  readonly availableManagers = signal<AvailableBranchManagerModel[]>([]);
readonly isAvailableManagersLoading = signal(false);

  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly totalCount = signal(0);

  readonly totalPages = computed(() => {
    return Math.ceil(this.totalCount() / this.pageSize());
  });

  readonly shownFrom = computed(() => {
    if (this.totalCount() === 0) {
      return 0;
    }

    return (this.pageNumber() - 1) * this.pageSize() + 1;
  });

  readonly shownTo = computed(() => {
    return Math.min(
      this.pageNumber() * this.pageSize(),
      this.totalCount()
    );
  });

  // ============================================================
  // UI State
  // ============================================================

  readonly isLoading = signal(false);
  readonly isStatisticsLoading = signal(false);
  readonly isActionLoading = signal(false);

  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // ============================================================
  // Confirmation Modal State
  // ============================================================

  readonly isConfirmationModalOpen = signal(false);

  readonly selectedBranchId = signal<number | null>(null);

  readonly selectedAction = signal<
    'activate' | 'deactivate' | 'delete' | null
  >(null);

  readonly confirmationModalType = signal<'success' | 'warning' | 'danger'>(
    'danger'
  );

  readonly confirmationModalTitle = signal('');
  readonly confirmationModalMessage = signal('');
  readonly confirmationModalConfirmText = signal('');

  // ============================================================
  // Setters
  // ============================================================

  setAvailableManagers(managers: AvailableBranchManagerModel[]): void {
  this.availableManagers.set(managers);
}

setAvailableManagersLoading(value: boolean): void {
  this.isAvailableManagersLoading.set(value);
}
  setBranches(branches: BranchResponseModel[]): void {
    this.branches.set(branches);
  }

  setSelectedBranch(branch: BranchResponseModel | null): void {
    this.selectedBranch.set(branch);
  }

  setStatistics(data: {
    totalBranches: number;
    activeBranches: number;
    inactiveBranches: number;
    lastUpdate: string | null;
  }): void {
    this.totalBranches.set(data.totalBranches);
    this.totalActiveBranches.set(data.activeBranches);
    this.totalInactiveBranches.set(data.inactiveBranches);
    this.lastUpdate.set(data.lastUpdate);
  }

  setSearchValue(value: string): void {
    this.searchValue.set(value);
  }

  setSelectedStatus(value: BranchStatusFilter): void {
    this.selectedStatus.set(value);
  }

  setPageNumber(value: number): void {
    this.pageNumber.set(value);
  }

  setPageSize(value: number): void {
    this.pageSize.set(value);
  }

  setTotalCount(value: number): void {
    this.totalCount.set(value);
  }

  setLoading(value: boolean): void {
    this.isLoading.set(value);
  }

  setStatisticsLoading(value: boolean): void {
    this.isStatisticsLoading.set(value);
  }

  setActionLoading(value: boolean): void {
    this.isActionLoading.set(value);
  }

  setErrorMessage(message: string | null): void {
    this.errorMessage.set(message);
  }

  setSuccessMessage(message: string | null): void {
    this.successMessage.set(message);
  }

  // ============================================================
  // Pagination Actions
  // ============================================================

  goToFirstPage(): void {
    this.pageNumber.set(1);
  }

  goToPreviousPage(): void {
    if (this.pageNumber() <= 1) {
      return;
    }

    this.pageNumber.update(value => value - 1);
  }

  goToNextPage(): void {
    if (this.pageNumber() >= this.totalPages()) {
      return;
    }

    this.pageNumber.update(value => value + 1);
  }

  // ============================================================
  // Filter Helpers
  // ============================================================

  getIsActiveFilter(): boolean | null {
    if (this.selectedStatus() === 'active') {
      return true;
    }

    if (this.selectedStatus() === 'inactive') {
      return false;
    }

    return null;
  }

  // ============================================================
  // Confirmation Modal Actions
  // ============================================================

  openActivateConfirmation(branchId: number): void {
    this.selectedBranchId.set(branchId);
    this.selectedAction.set('activate');

    this.confirmationModalType.set('success');
    this.confirmationModalTitle.set(
      'Branches-Management-Keys.ACTIVATE_BRANCH_TITLE'
    );
    this.confirmationModalMessage.set(
      'Branches-Management-Keys.ACTIVATE_BRANCH_MESSAGE'
    );
    this.confirmationModalConfirmText.set('COMMON.ACTIVATE');

    this.isConfirmationModalOpen.set(true);
  }

  openDeactivateConfirmation(branchId: number): void {
    this.selectedBranchId.set(branchId);
    this.selectedAction.set('deactivate');

    this.confirmationModalType.set('warning');
    this.confirmationModalTitle.set(
      'Branches-Management-Keys.DEACTIVATE_BRANCH_TITLE'
    );
    this.confirmationModalMessage.set(
      'Branches-Management-Keys.DEACTIVATE_BRANCH_MESSAGE'
    );
    this.confirmationModalConfirmText.set('COMMON.DEACTIVATE');

    this.isConfirmationModalOpen.set(true);
  }

  openDeleteConfirmation(branchId: number): void {
    this.selectedBranchId.set(branchId);
    this.selectedAction.set('delete');

    this.confirmationModalType.set('danger');
    this.confirmationModalTitle.set(
      'Branches-Management-Keys.DELETE_BRANCH_TITLE'
    );
    this.confirmationModalMessage.set(
      'Branches-Management-Keys.DELETE_BRANCH_MESSAGE'
    );
    this.confirmationModalConfirmText.set('COMMON.DELETE');

    this.isConfirmationModalOpen.set(true);
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen.set(false);
    this.selectedBranchId.set(null);
    this.selectedAction.set(null);
  }

  // ============================================================
  // Reset
  // ============================================================

  resetMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  resetListState(): void {
    this.branches.set([]);
    this.totalCount.set(0);
    this.pageNumber.set(1);
    this.searchValue.set('');
    this.selectedStatus.set('all');
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
