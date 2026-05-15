import { Injectable, inject } from '@angular/core';
import { finalize } from 'rxjs';

import { Failure } from '../../../../core/errors/failure';

import { HospitalManagementRepository } from '../../../hospital-management/domain/repositories/hospital-management.repository';

import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';
import { BloodRequestStore } from '../store/blood-request.store';

import { CreateBloodRequestModel } from '../../domain/models/create-blood-request.model';
import { DoctorReviewBloodRequestModel } from '../../domain/models/doctor-review-blood-request.model';
import { EmployeeReviewBloodRequestModel } from '../../domain/models/employee-review-blood-request.model';
import { CancelBloodRequestModel } from '../../domain/models/cancel-blood-request.model';

@Injectable()
export class BloodRequestFacade {
  readonly store = inject(BloodRequestStore);

  private readonly bloodRequestRepository = inject(BloodRequestRepository);

  private readonly hospitalManagementRepository = inject(
    HospitalManagementRepository
  );

  // ============================================================
  // Initial Data For Create Blood Request
  // ============================================================

  /**
   * Called when entering create request page.
   *
   * Self:
   * - loads active hospitals
   * - loads current citizen data
   *
   * Other:
   * - loads active hospitals
   * - waits for user to enter national ID and click Fetch
   */
  loadCreateRequestInitialData(isSelfRequest: boolean): void {
    this.store.resetCreateRequestState();

    this.loadActiveHospitals();

    if (isSelfRequest) {
      this.loadCurrentCitizenData();
    }
  }

  /**
   * Loads current logged-in citizen data.
   * Used for self blood request.
   */
  loadCurrentCitizenData(): void {
    this.store.setCitizenDataLoading(true);
    this.store.setErrorMessage(null);
    this.store.setCurrentCitizenData(null);

    this.bloodRequestRepository
      .getCurrentCitizenData()
      .pipe(finalize(() => this.store.setCitizenDataLoading(false)))
      .subscribe({
        next: result => {
          this.store.setCurrentCitizenData(result);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  /**
   * Looks up beneficiary data by national ID.
   * Used for other-person blood request.
   */
  lookupBeneficiaryByNationalId(
    nationalId: string,
    onSuccess?: () => void
  ): void {
    this.store.setBeneficiaryLookupLoading(true);
    this.store.setErrorMessage(null);
    this.store.setBeneficiaryData(null);

    this.bloodRequestRepository
      .lookupBeneficiaryByNationalId(nationalId)
      .pipe(finalize(() => this.store.setBeneficiaryLookupLoading(false)))
      .subscribe({
        next: result => {
          this.store.setBeneficiaryData(result);
          onSuccess?.();
        },
        error: error => {
          this.store.setBeneficiaryData(null);
          this.handleError(error);
        }
      });
  }

  /**
   * Loads active hospitals for the create blood request form.
   */
  loadActiveHospitals(): void {
    this.store.setActiveHospitalsLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository
      .getAllHospitals({
        pageNumber: 1,
        pageSize: 100,
        searchTerm: null,
        isActive: true
      })
      .pipe(finalize(() => this.store.setActiveHospitalsLoading(false)))
      .subscribe({
        next: result => {
          this.store.setActiveHospitals(result.items);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  /**
   * Loads available doctors for selected hospital.
   *
   * Important:
   * This assumes your HospitalManagementRepository has getAvailableDoctors()
   * and accepts hospitalId in query.
   *
   * If your method name or query shape is different, only modify this method.
   */
  loadDoctorsByHospital(hospitalId: number): void {
    this.store.setDoctors([]);
    this.store.setDoctorsLoading(true);
    this.store.setErrorMessage(null);

    this.hospitalManagementRepository
      .getAvailableDoctors(hospitalId)
      .pipe(finalize(() => this.store.setDoctorsLoading(false)))
      .subscribe({
        next: result => {
          this.store.setDoctors(result);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  // ============================================================
  // Citizen Blood Request Actions
  // ============================================================

  /**
   * Creates a blood request.
   *
   * Self payload:
   * {
   *   relationshipType: Self,
   *   hospitalId,
   *   doctorId,
   *   beneficiaryNationalId: null
   * }
   *
   * Other payload:
   * {
   *   relationshipType,
   *   hospitalId,
   *   doctorId,
   *   beneficiaryNationalId
   * }
   */
  createBloodRequest(
    request: CreateBloodRequestModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);
    this.store.setSuccessMessage(null);

    this.bloodRequestRepository
      .createBloodRequest(request)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: result => {
          this.store.setSelectedBloodRequest(result);
          this.store.setSuccessMessage(
            'Create-Blood-Request-Form-Keys.REQUEST_CREATED_SUCCESSFULLY'
          );
          onSuccess?.();
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  // ============================================================
  // Citizen List
  // ============================================================

  /**
   * Loads current citizen requests.
   */
  loadMyBloodRequests(): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);

    this.bloodRequestRepository
      .getMyBloodRequests({
        pageNumber: this.store.pageNumber(),
        pageSize: this.store.pageSize(),
        searchTerm: this.store.searchValue().trim() || null,
        requestStatus: this.store.getRequestStatusFilter(),
        bloodType: this.store.selectedBloodType(),
        urgencyLevel: this.store.selectedUrgencyLevel(),
        hospitalId: this.store.selectedHospitalId(),
        branchId: this.store.selectedBranchId(),
        fromDate: this.store.fromDate(),
        toDate: this.store.toDate()
      })
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: result => {
          this.store.setBloodRequests(result.items);
          this.store.setTotalCount(result.totalCount);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  // ============================================================
  // Doctor List / Review
  // ============================================================

  /**
   * Loads requests assigned to current doctor.
   */
  loadDoctorBloodRequests(): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);

    this.bloodRequestRepository
      .getDoctorBloodRequests({
        pageNumber: this.store.pageNumber(),
        pageSize: this.store.pageSize(),
        searchTerm: this.store.searchValue().trim() || null,
        requestStatus: this.store.getRequestStatusFilter(),
        bloodType: this.store.selectedBloodType(),
        urgencyLevel: this.store.selectedUrgencyLevel(),
        hospitalId: this.store.selectedHospitalId(),
        branchId: this.store.selectedBranchId(),
        fromDate: this.store.fromDate(),
        toDate: this.store.toDate()
      })
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: result => {
          this.store.setBloodRequests(result.items);
          this.store.setTotalCount(result.totalCount);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  /**
   * Doctor approves or rejects a blood request.
   */
  doctorReviewBloodRequest(
    requestId: number,
    request: DoctorReviewBloodRequestModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);
    this.store.setSuccessMessage(null);

    this.bloodRequestRepository
      .doctorReviewBloodRequest(requestId, request)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: result => {
          this.store.setSelectedBloodRequest(result);
          this.store.setSuccessMessage('Blood request reviewed successfully.');
          onSuccess?.();
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  // ============================================================
  // Employee / Branch Manager List / Review
  // ============================================================

  /**
   * Loads requests related to current employee / branch manager branch.
   */
  loadBranchBloodRequests(): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);

    this.bloodRequestRepository
      .getBranchBloodRequests({
        pageNumber: this.store.pageNumber(),
        pageSize: this.store.pageSize(),
        searchTerm: this.store.searchValue().trim() || null,
        requestStatus: this.store.getRequestStatusFilter(),
        bloodType: this.store.selectedBloodType(),
        urgencyLevel: this.store.selectedUrgencyLevel(),
        hospitalId: this.store.selectedHospitalId(),
        branchId: this.store.selectedBranchId(),
        fromDate: this.store.fromDate(),
        toDate: this.store.toDate()
      })
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: result => {
          this.store.setBloodRequests(result.items);
          this.store.setTotalCount(result.totalCount);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  /**
   * Employee / BranchManager reviews request and reserves available units.
   */
  employeeReviewBloodRequest(
    requestId: number,
    request: EmployeeReviewBloodRequestModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);
    this.store.setSuccessMessage(null);

    this.bloodRequestRepository
      .employeeReviewBloodRequest(requestId, request)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: result => {
          this.store.setSelectedBloodRequest(result);
          this.store.setSuccessMessage('Blood request reviewed successfully.');
          onSuccess?.();
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  /**
   * Employee / BranchManager publishes shortage request.
   */
  publishBloodRequest(requestId: number, onSuccess?: () => void): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);
    this.store.setSuccessMessage(null);

    this.bloodRequestRepository
      .publishBloodRequest(requestId)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: result => {
          this.store.setSelectedBloodRequest(result);
          this.store.setSuccessMessage('Blood request published successfully.');
          onSuccess?.();
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  // ============================================================
  // Shared Details / Cancel
  // ============================================================

  /**
   * Loads blood request details by ID.
   */
  loadBloodRequestById(requestId: number): void {
    this.store.setLoading(true);
    this.store.setErrorMessage(null);
    this.store.setSelectedBloodRequest(null);

    this.bloodRequestRepository
      .getBloodRequestById(requestId)
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe({
        next: result => {
          this.store.setSelectedBloodRequest(result);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  /**
   * Cancels a blood request.
   */
  cancelBloodRequest(
    requestId: number,
    request: CancelBloodRequestModel,
    onSuccess?: () => void
  ): void {
    this.store.setActionLoading(true);
    this.store.setErrorMessage(null);
    this.store.setSuccessMessage(null);

    this.bloodRequestRepository
      .cancelBloodRequest(requestId, request)
      .pipe(finalize(() => this.store.setActionLoading(false)))
      .subscribe({
        next: result => {
          this.store.setSelectedBloodRequest(result);
          this.store.setSuccessMessage('Blood request cancelled successfully.');
          onSuccess?.();
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  // ============================================================
  // Pagination / Filters Helpers
  // ============================================================

  changePage(pageNumber: number): void {
    this.store.setPageNumber(pageNumber);
  }

  changePageSize(pageSize: number): void {
    this.store.setPageSize(pageSize);
    this.store.setPageNumber(1);
  }

  clearFilters(): void {
    this.store.clearFilters();
  }

  // ============================================================
  // Private Helpers
  // ============================================================

  private handleError(error: unknown): void {
    const failure = error as Failure;

    this.store.setErrorMessage(
      failure?.message ?? 'An unexpected error occurred.'
    );
  }
}
