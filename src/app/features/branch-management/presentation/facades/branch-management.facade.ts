import { Injectable, inject } from '@angular/core';
import { finalize } from 'rxjs';

import { BranchManagementRepository } from '../../domain/repositories/branch-management.repository';
import { BranchManagementStore } from '../store/branch-management.store';

import { Failure } from '../../../../core/errors/failure';

import { AddBranchModel } from '../../domain/models/add-branch.model';
import { UpdateBranchModel } from '../../domain/models/update-branch.model';
import { BranchStatusFilter } from '../components/branches-filters/branches-filters.component';

@Injectable()
export class BranchManagementFacade {
  private readonly branchManagementRepository = inject(BranchManagementRepository);
  readonly store = inject(BranchManagementStore);

  // ============================================================
  // Load Initial Page
  // ============================================================

  loadInitialData(): void {
    this.loadStatistics();
    this.loadBranches();
  }

  loadAvailableManagers(currentBranchId?: number | null): void {
  this.store.setAvailableManagersLoading(true);
  this.store.setErrorMessage(null);

  this.branchManagementRepository.getAvailableManagers(currentBranchId)
    .pipe(
      finalize(() => this.store.setAvailableManagersLoading(false))
    )
    .subscribe({
      next: managers => {
        this.store.setAvailableManagers(managers);
      },
      error: (error: Failure) => {
        this.store.setErrorMessage(error.message);
      }
    });
}

  // ============================================================
  // Statistics
  // ============================================================

  loadStatistics(): void {
    this.store.setStatisticsLoading(true);

    this.branchManagementRepository.getStatistics()
      .pipe(
        finalize(() => this.store.setStatisticsLoading(false))
      )
      .subscribe({
        next: statistics => {
          this.store.setStatistics(statistics);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  // ============================================================
  // Branches List
  // ============================================================

  loadBranches(): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.getAllBranches({
      pageNumber: this.store.pageNumber(),
      pageSize: this.store.pageSize(),
      searchTerm: this.store.searchValue().trim() || null,
      isActive: this.store.getIsActiveFilter()
    })
      .pipe(
        finalize(() => this.store.setLoading(false))
      )
      .subscribe({
        next: result => {
          this.store.setBranches(result.items);
          this.store.setTotalCount(result.totalCount);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  // ============================================================
  // Get Branch By Id
  // ============================================================

  loadBranchById(branchId: number): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.getBranchById(branchId)
      .pipe(
        finalize(() => this.store.setLoading(false))
      )
      .subscribe({
        next: branch => {
          this.store.setSelectedBranch(branch);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  // ============================================================
  // Filters
  // ============================================================

  updateSearchValue(value: string): void {
    this.store.setSearchValue(value);
  }

  searchBranches(): void {
    this.store.goToFirstPage();
    this.loadBranches();
  }

  updateStatusFilter(value: BranchStatusFilter): void {
    this.store.setSelectedStatus(value);
    this.store.goToFirstPage();
    this.loadBranches();
  }

  clearFilters(): void {
    this.store.setSearchValue('');
    this.store.setSelectedStatus('all');
    this.store.goToFirstPage();
    this.loadBranches();
  }

  // ============================================================
  // Pagination
  // ============================================================

  previousPage(): void {
    this.store.goToPreviousPage();
    this.loadBranches();
  }

  nextPage(): void {
    this.store.goToNextPage();
    this.loadBranches();
  }

  // ============================================================
  // Add / Update
  // ============================================================

  addBranch(
    request: AddBranchModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.addBranch(request)
      .pipe(
        finalize(() => this.store.setActionLoading(false))
      )
      .subscribe({
        next: () => {
          this.store.setSuccessMessage(
            'Branches-Management-Keys.BRANCH_ADDED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadBranches();

          onSuccess?.();
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  updateBranch(
    branchId: number,
    request: UpdateBranchModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.updateBranch(branchId, request)
      .pipe(
        finalize(() => this.store.setActionLoading(false))
      )
      .subscribe({
        next: updatedBranch => {
          this.store.setSelectedBranch(updatedBranch);

          this.store.setSuccessMessage(
            'Branches-Management-Keys.BRANCH_UPDATED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadBranches();

          onSuccess?.();
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  // ============================================================
  // Confirmation Modal
  // ============================================================

  openActivateConfirmation(branchId: number): void {
    this.store.openActivateConfirmation(branchId);
  }

  openDeactivateConfirmation(branchId: number): void {
    this.store.openDeactivateConfirmation(branchId);
  }

  openDeleteConfirmation(branchId: number): void {
    this.store.openDeleteConfirmation(branchId);
  }

  closeConfirmationModal(): void {
    this.store.closeConfirmationModal();
  }

  confirmBranchAction(): void {
    const branchId = this.store.selectedBranchId();
    const action = this.store.selectedAction();

    if (!branchId || !action) {
      return;
    }

    if (action === 'activate') {
      this.activateBranch(branchId);
      return;
    }

    if (action === 'deactivate') {
      this.deactivateBranch(branchId);
      return;
    }

    if (action === 'delete') {
      this.softDeleteBranch(branchId);
      return;
    }
  }

  // ============================================================
  // Activate / Deactivate / Delete
  // ============================================================

  private activateBranch(branchId: number): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.activateBranch(branchId)
      .pipe(
        finalize(() => this.store.setActionLoading(false))
      )
      .subscribe({
        next: () => {
          this.store.closeConfirmationModal();

          this.store.setSuccessMessage(
            'Branches-Management-Keys.BRANCH_ACTIVATED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadBranches();
        },
        error: (error: Failure) => {
          this.store.closeConfirmationModal();
          this.store.setErrorMessage(error.message);
        }
      });
  }

  private deactivateBranch(branchId: number): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.deactivateBranch(branchId)
      .pipe(
        finalize(() => this.store.setActionLoading(false))
      )
      .subscribe({
        next: () => {
          this.store.closeConfirmationModal();

          this.store.setSuccessMessage(
            'Branches-Management-Keys.BRANCH_DEACTIVATED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadBranches();
        },
        error: (error: Failure) => {
          this.store.closeConfirmationModal();
          this.store.setErrorMessage(error.message);
        }
      });
  }

  private softDeleteBranch(branchId: number): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.softDeleteBranch(branchId)
      .pipe(
        finalize(() => this.store.setActionLoading(false))
      )
      .subscribe({
        next: () => {
          this.store.closeConfirmationModal();

          this.store.setSuccessMessage(
            'Branches-Management-Keys.BRANCH_DELETED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadBranches();
        },
        error: (error: Failure) => {
          this.store.closeConfirmationModal();
          this.store.setErrorMessage(error.message);
        }
      });
  }
}
