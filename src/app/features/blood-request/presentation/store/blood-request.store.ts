import { Injectable, signal } from '@angular/core';

import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';

import { HospitalModel } from '../../../hospital-management/domain/models/hospital.model';
import { AvailableDoctorModel } from '../../../hospital-management/domain/models/available-doctor.model';

import { CitizenDataModel } from '../../domain/models/citizen-data.model';
import { BloodRequestModel } from '../../domain/models/blood-request.model';
import { BloodRequestDetailsModel } from '../../domain/models/blood-request-details.model';

import { RequestStatus } from '../../domain/enums/request-status.enum';
import { UrgencyLevel } from '../../domain/enums/urgency-level.enum';

@Injectable()
export class BloodRequestStore {
  // ============================================================
  // Create Blood Request State
  // ============================================================

  /**
   * Used in Self blood request.
   * Loaded from:
   * GET /api/blood-requests/citizen-data
   */
  readonly currentCitizenData = signal<CitizenDataModel | null>(null);

  /**
   * Used in Other blood request.
   * Loaded from:
   * GET /api/blood-requests/beneficiary-lookup/{nationalId}
   */
  readonly beneficiaryData = signal<CitizenDataModel | null>(null);

  /**
   * Active hospitals used in create blood request form.
   */
  readonly activeHospitals = signal<HospitalModel[]>([]);

  /**
   * Doctors related to selected hospital.
   * Loaded after user selects a hospital.
   */
  readonly doctors = signal<AvailableDoctorModel[]>([]);

  // ============================================================
  // Blood Request List / Details State
  // ============================================================

  readonly bloodRequests = signal<BloodRequestModel[]>([]);

  readonly selectedBloodRequest = signal<BloodRequestDetailsModel | null>(null);

  readonly totalCount = signal(0);

  readonly pageNumber = signal(1);

  readonly pageSize = signal(10);

  // ============================================================
  // Filters State
  // ============================================================

  readonly searchValue = signal('');

  readonly selectedRequestStatus = signal<RequestStatus | null>(null);

  readonly selectedBloodType = signal<BloodTypeEnum | null>(null);

  readonly selectedUrgencyLevel = signal<UrgencyLevel | null>(null);

  readonly selectedHospitalId = signal<number | null>(null);

  readonly selectedBranchId = signal<number | null>(null);

  readonly fromDate = signal<string | null>(null);

  readonly toDate = signal<string | null>(null);

  // ============================================================
  // Loading State
  // ============================================================

  /**
   * General loading for lists and details.
   */
  readonly isLoading = signal(false);

  /**
   * Used for create / review / cancel actions.
   */
  readonly isActionLoading = signal(false);

  /**
   * Loading for GET citizen-data.
   */
  readonly isCitizenDataLoading = signal(false);

  /**
   * Loading for GET beneficiary-lookup/{nationalId}.
   */
  readonly isBeneficiaryLookupLoading = signal(false);

  /**
   * Loading active hospitals.
   */
  readonly isActiveHospitalsLoading = signal(false);

  /**
   * Loading doctors after hospital selection.
   */
  readonly isDoctorsLoading = signal(false);

  // ============================================================
  // Messages State
  // ============================================================

  readonly errorMessage = signal<string | null>(null);

  readonly successMessage = signal<string | null>(null);

  // ============================================================
  // Create Blood Request Setters
  // ============================================================

  setCurrentCitizenData(value: CitizenDataModel | null): void {
    this.currentCitizenData.set(value);
  }

  setBeneficiaryData(value: CitizenDataModel | null): void {
    this.beneficiaryData.set(value);
  }

  setActiveHospitals(value: HospitalModel[]): void {
    this.activeHospitals.set(value);
  }

  setDoctors(value: AvailableDoctorModel[]): void {
    this.doctors.set(value);
  }

  // ============================================================
  // Blood Request List / Details Setters
  // ============================================================

  setBloodRequests(value: BloodRequestModel[]): void {
    this.bloodRequests.set(value);
  }

  setSelectedBloodRequest(value: BloodRequestDetailsModel | null): void {
    this.selectedBloodRequest.set(value);
  }

  setTotalCount(value: number): void {
    this.totalCount.set(value);
  }

  setPageNumber(value: number): void {
    this.pageNumber.set(value);
  }

  setPageSize(value: number): void {
    this.pageSize.set(value);
  }

  // ============================================================
  // Filters Setters
  // ============================================================

  setSearchValue(value: string): void {
    this.searchValue.set(value);
    this.pageNumber.set(1);
  }

  setRequestStatusFilter(value: RequestStatus | null): void {
    this.selectedRequestStatus.set(value);
    this.pageNumber.set(1);
  }

  setBloodTypeFilter(value: BloodTypeEnum | null): void {
    this.selectedBloodType.set(value);
    this.pageNumber.set(1);
  }

  setUrgencyLevelFilter(value: UrgencyLevel | null): void {
    this.selectedUrgencyLevel.set(value);
    this.pageNumber.set(1);
  }

  setSelectedHospitalId(value: number | null): void {
    this.selectedHospitalId.set(value);
    this.pageNumber.set(1);
  }

  setSelectedBranchId(value: number | null): void {
    this.selectedBranchId.set(value);
    this.pageNumber.set(1);
  }

  setFromDate(value: string | null): void {
    this.fromDate.set(value);
    this.pageNumber.set(1);
  }

  setToDate(value: string | null): void {
    this.toDate.set(value);
    this.pageNumber.set(1);
  }

  clearFilters(): void {
    this.searchValue.set('');
    this.selectedRequestStatus.set(null);
    this.selectedBloodType.set(null);
    this.selectedUrgencyLevel.set(null);
    this.selectedHospitalId.set(null);
    this.selectedBranchId.set(null);
    this.fromDate.set(null);
    this.toDate.set(null);
    this.pageNumber.set(1);
  }

  // ============================================================
  // Loading Setters
  // ============================================================

  setLoading(value: boolean): void {
    this.isLoading.set(value);
  }

  setActionLoading(value: boolean): void {
    this.isActionLoading.set(value);
  }

  setCitizenDataLoading(value: boolean): void {
    this.isCitizenDataLoading.set(value);
  }

  setBeneficiaryLookupLoading(value: boolean): void {
    this.isBeneficiaryLookupLoading.set(value);
  }

  setActiveHospitalsLoading(value: boolean): void {
    this.isActiveHospitalsLoading.set(value);
  }

  setDoctorsLoading(value: boolean): void {
    this.isDoctorsLoading.set(value);
  }

  // ============================================================
  // Messages Setters
  // ============================================================

  setErrorMessage(value: string | null): void {
    this.errorMessage.set(value);
  }

  setSuccessMessage(value: string | null): void {
    this.successMessage.set(value);
  }

  clearMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  // ============================================================
  // Helpers
  // ============================================================

  getRequestStatusFilter(): RequestStatus | null {
    return this.selectedRequestStatus();
  }

  /**
   * Used when entering create blood request pages.
   * It clears old patient / beneficiary / doctor state.
   */
  resetCreateRequestState(): void {
    this.currentCitizenData.set(null);
    this.beneficiaryData.set(null);
    this.doctors.set([]);

    this.isCitizenDataLoading.set(false);
    this.isBeneficiaryLookupLoading.set(false);
    this.isDoctorsLoading.set(false);

    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  /**
   * Used when leaving the feature or refreshing everything.
   */
  resetAllState(): void {
    this.resetCreateRequestState();

    this.activeHospitals.set([]);
    this.bloodRequests.set([]);
    this.selectedBloodRequest.set(null);
    this.totalCount.set(0);

    this.pageNumber.set(1);
    this.pageSize.set(10);

    this.clearFilters();

    this.isLoading.set(false);
    this.isActionLoading.set(false);
    this.isActiveHospitalsLoading.set(false);
  }
}
