import { computed, Injectable, signal } from '@angular/core';

import { HospitalModel } from '../../domain/models/hospital.model';
import { AvailableDoctorModel } from '../../domain/models/available-doctor.model';
import { BranchInfoModel } from '../../../branch-management/domain/models/branch-info.model';

export type HospitalStatusFilter = 'all' | 'active' | 'inactive';

@Injectable()
export class HospitalManagementStore {
  // Data
  readonly hospitals = signal<HospitalModel[]>([]);
  readonly selectedHospital = signal<HospitalModel | null>(null);

  // Statistics
  readonly totalHospitals = signal(0);
  readonly totalActiveHospitals = signal(0);
  readonly totalInactiveHospitals = signal(0);
  readonly lastUpdate = signal<string | null>(null);

  // Dropdown Data
  readonly activeBranches = signal<BranchInfoModel[]>([]);
  readonly availableDoctors = signal<AvailableDoctorModel[]>([]);

  // Filters
  readonly searchValue = signal('');
  readonly selectedStatus = signal<HospitalStatusFilter>('all');
  readonly selectedBranchId = signal<number | null>(null);

  // Pagination
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
    return Math.min(this.pageNumber() * this.pageSize(), this.totalCount());
  });

  // UI
  readonly isLoading = signal(false);
  readonly isStatisticsLoading = signal(false);
  readonly isActionLoading = signal(false);
  readonly isActiveBranchesLoading = signal(false);
  readonly isAvailableDoctorsLoading = signal(false);

  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Confirmation Modal
  readonly isConfirmationModalOpen = signal(false);
  readonly selectedHospitalId = signal<number | null>(null);

  readonly selectedAction = signal<
    'activate' | 'deactivate' | 'delete' | null
  >(null);

  readonly confirmationModalType = signal<'success' | 'warning' | 'danger'>(
    'danger'
  );

  readonly confirmationModalTitle = signal('');
  readonly confirmationModalMessage = signal('');
  readonly confirmationModalConfirmText = signal('');

  // Setters
  setHospitals(hospitals: HospitalModel[]): void {
    this.hospitals.set(hospitals);
  }

  setSelectedHospital(hospital: HospitalModel | null): void {
    this.selectedHospital.set(hospital);
  }

  setStatistics(data: {
    totalHospitals: number;
    activeHospitals: number;
    inactiveHospitals: number;
    lastUpdate: string | null;
  }): void {
    this.totalHospitals.set(data.totalHospitals);
    this.totalActiveHospitals.set(data.activeHospitals);
    this.totalInactiveHospitals.set(data.inactiveHospitals);
    this.lastUpdate.set(data.lastUpdate);
  }

  setActiveBranches(branches: BranchInfoModel[]): void {
    this.activeBranches.set(branches);
  }

  setAvailableDoctors(doctors: AvailableDoctorModel[]): void {
    this.availableDoctors.set(doctors);
  }

  setSearchValue(value: string): void {
    this.searchValue.set(value);
  }

  setSelectedStatus(value: HospitalStatusFilter): void {
    this.selectedStatus.set(value);
  }

  setSelectedBranchId(value: number | null): void {
    this.selectedBranchId.set(value);
  }

  setPageNumber(value: number): void {
    this.pageNumber.set(value);
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

  setActiveBranchesLoading(value: boolean): void {
    this.isActiveBranchesLoading.set(value);
  }

  setAvailableDoctorsLoading(value: boolean): void {
    this.isAvailableDoctorsLoading.set(value);
  }

  setErrorMessage(message: string | null): void {
    this.errorMessage.set(message);
  }

  setSuccessMessage(message: string | null): void {
    this.successMessage.set(message);
  }

  // Pagination
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

  // Filter Helper
  getIsActiveFilter(): boolean | null {
    if (this.selectedStatus() === 'active') {
      return true;
    }

    if (this.selectedStatus() === 'inactive') {
      return false;
    }

    return null;
  }

  // Confirmation Modal
  openActivateConfirmation(hospitalId: number): void {
    this.selectedHospitalId.set(hospitalId);
    this.selectedAction.set('activate');

    this.confirmationModalType.set('success');
    this.confirmationModalTitle.set('Hospitals-Management-Keys.ACTIVATE_HOSPITAL_TITLE');
    this.confirmationModalMessage.set('Hospitals-Management-Keys.ACTIVATE_HOSPITAL_MESSAGE');
    this.confirmationModalConfirmText.set('COMMON.ACTIVATE');

    this.isConfirmationModalOpen.set(true);
  }

  openDeactivateConfirmation(hospitalId: number): void {
    this.selectedHospitalId.set(hospitalId);
    this.selectedAction.set('deactivate');

    this.confirmationModalType.set('warning');
    this.confirmationModalTitle.set('Hospitals-Management-Keys.DEACTIVATE_HOSPITAL_TITLE');
    this.confirmationModalMessage.set('Hospitals-Management-Keys.DEACTIVATE_HOSPITAL_MESSAGE');
    this.confirmationModalConfirmText.set('COMMON.DEACTIVATE');

    this.isConfirmationModalOpen.set(true);
  }

  openDeleteConfirmation(hospitalId: number): void {
    this.selectedHospitalId.set(hospitalId);
    this.selectedAction.set('delete');

    this.confirmationModalType.set('danger');
    this.confirmationModalTitle.set('Hospitals-Management-Keys.DELETE_HOSPITAL_TITLE');
    this.confirmationModalMessage.set('Hospitals-Management-Keys.DELETE_HOSPITAL_MESSAGE');
    this.confirmationModalConfirmText.set('COMMON.DELETE');

    this.isConfirmationModalOpen.set(true);
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen.set(false);
    this.selectedHospitalId.set(null);
    this.selectedAction.set(null);
  }

  resetMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
  resetListState(): void {
  this.hospitals.set([]);
  this.totalCount.set(0);
  this.pageNumber.set(1);
  this.searchValue.set('');
  this.selectedStatus.set('all');
  this.selectedBranchId.set(null);
  this.errorMessage.set(null);
  this.successMessage.set(null);
}
}
