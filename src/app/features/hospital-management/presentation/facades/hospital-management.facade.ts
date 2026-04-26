import { Injectable, inject } from '@angular/core';
import { finalize } from 'rxjs';

import { Failure } from '../../../../core/errors/failure';

import { HospitalManagementRepository } from '../../domain/repositories/hospital-management.repository';
import { HospitalManagementStore, HospitalStatusFilter } from '../store/hospital-management.store';

import { AddHospitalRequestModel } from '../../domain/models/add-hospital-request.model';
import { UpdateHospitalRequestModel } from '../../domain/models/update-hospital-request.model';

import { BranchManagementRepository } from '../../../branch-management/domain/repositories/branch-management.repository';

@Injectable()
export class HospitalManagementFacade {
  private readonly hospitalManagementRepository = inject(HospitalManagementRepository);
  private readonly branchManagementRepository = inject(BranchManagementRepository);

  readonly store = inject(HospitalManagementStore);

  loadInitialData(): void {
    this.loadStatistics();
    this.loadHospitals();
    this.loadActiveBranches();
  }

  loadStatistics(): void {
    this.store.setStatisticsLoading(true);

    this.hospitalManagementRepository.getStatistics()
      .pipe(finalize(() => this.store.setStatisticsLoading(false)))
      .subscribe({
        next: statistics => {
          this.store.setStatistics(statistics);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  loadHospitals(): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.getAllHospitals({
      pageNumber: this.store.pageNumber(),
      pageSize: this.store.pageSize(),
      searchTerm: this.store.searchValue().trim() || null,
      isActive: this.store.getIsActiveFilter(),
      branchId: this.store.selectedBranchId()
    })
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: result => {
          this.store.setHospitals(result.items);
          this.store.setTotalCount(result.totalCount);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  loadHospitalById(hospitalId: number): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.getHospitalById(hospitalId)
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: hospital => {
          this.store.setSelectedHospital(hospital);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  loadAvailableDoctors(currentHospitalId?: number | null): void {
    this.store.setAvailableDoctorsLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.getAvailableDoctors(currentHospitalId)
      .pipe(finalize(() => this.store.setAvailableDoctorsLoading(false)))
      .subscribe({
        next: doctors => {
          this.store.setAvailableDoctors(doctors);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  loadActiveBranches(): void {
    this.store.setActiveBranchesLoading(true);
    this.store.setErrorMessage(null);

    this.branchManagementRepository.getAllBranches({
      pageNumber: 1,
      pageSize: 100,
      searchTerm: null,
      isActive: true
    })
      .pipe(finalize(() => this.store.setActiveBranchesLoading(false)))
      .subscribe({
        next: result => {
          this.store.setActiveBranches(result.items);
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  updateSearchValue(value: string): void {
    this.store.setSearchValue(value);
  }

  searchHospitals(): void {
    this.store.goToFirstPage();
    this.loadHospitals();
  }

  updateStatusFilter(value: HospitalStatusFilter): void {
    this.store.setSelectedStatus(value);
    this.store.goToFirstPage();
    this.loadHospitals();
  }

  updateBranchFilter(branchId: number | null): void {
    this.store.setSelectedBranchId(branchId);
    this.store.goToFirstPage();
    this.loadHospitals();
  }

  clearFilters(): void {
    this.store.setSearchValue('');
    this.store.setSelectedStatus('all');
    this.store.setSelectedBranchId(null);
    this.store.goToFirstPage();
    this.loadHospitals();
  }

  previousPage(): void {
    this.store.goToPreviousPage();
    this.loadHospitals();
  }

  nextPage(): void {
    this.store.goToNextPage();
    this.loadHospitals();
  }

  addHospital(
    request: AddHospitalRequestModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.addHospital(request)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: () => {
          this.store.setSuccessMessage(
            'Add-Hospital-Keys.HOSPITAL_ADDED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadHospitals();

          onSuccess?.();
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  updateHospital(
    hospitalId: number,
    request: UpdateHospitalRequestModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.updateHospital(hospitalId, request)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: hospital => {
          this.store.setSelectedHospital(hospital);

          this.store.setSuccessMessage(
            'Hospitals-Management-Keys.HOSPITAL_UPDATED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadHospitals();

          onSuccess?.();
        },
        error: (error: Failure) => {
          this.store.setErrorMessage(error.message);
        }
      });
  }

  openActivateConfirmation(hospitalId: number): void {
    this.store.openActivateConfirmation(hospitalId);
  }

  openDeactivateConfirmation(hospitalId: number): void {
    this.store.openDeactivateConfirmation(hospitalId);
  }

  openDeleteConfirmation(hospitalId: number): void {
    this.store.openDeleteConfirmation(hospitalId);
  }

  closeConfirmationModal(): void {
    this.store.closeConfirmationModal();
  }

  confirmHospitalAction(): void {
    const hospitalId = this.store.selectedHospitalId();
    const action = this.store.selectedAction();

    if (!hospitalId || !action) {
      return;
    }

    if (action === 'activate') {
      this.activateHospital(hospitalId);
      return;
    }

    if (action === 'deactivate') {
      this.deactivateHospital(hospitalId);
      return;
    }

    if (action === 'delete') {
      this.softDeleteHospital(hospitalId);
      return;
    }
  }

  private activateHospital(hospitalId: number): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.activateHospital(hospitalId)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: () => {
          this.store.closeConfirmationModal();
          this.store.setSuccessMessage(
            'Hospitals-Management-Keys.HOSPITAL_ACTIVATED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadHospitals();
        },
        error: (error: Failure) => {
          this.store.closeConfirmationModal();
          this.store.setErrorMessage(error.message);
        }
      });
  }

  private deactivateHospital(hospitalId: number): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.deactivateHospital(hospitalId)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: () => {
          this.store.closeConfirmationModal();
          this.store.setSuccessMessage(
            'Hospitals-Management-Keys.HOSPITAL_DEACTIVATED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadHospitals();
        },
        error: (error: Failure) => {
          this.store.closeConfirmationModal();
          this.store.setErrorMessage(error.message);
        }
      });
  }

  private softDeleteHospital(hospitalId: number): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository.softDeleteHospital(hospitalId)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: () => {
          this.store.closeConfirmationModal();
          this.store.setSuccessMessage(
            'Hospitals-Management-Keys.HOSPITAL_DELETED_SUCCESSFULLY'
          );

          this.loadStatistics();
          this.loadHospitals();
        },
        error: (error: Failure) => {
          this.store.closeConfirmationModal();
          this.store.setErrorMessage(error.message);
        }
      });
  }
}
