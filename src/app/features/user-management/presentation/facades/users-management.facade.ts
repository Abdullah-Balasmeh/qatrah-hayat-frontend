import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import {
  UsersManagementStore,
  UsersTabType,
} from '../store/users-management.store';

import { UserManagementQueryModel } from '../../domain/models/user-management-query.model';
import { UsersManagementRepository } from '../../domain/repositories/users-management.repository';

import { Router } from '@angular/router';
import { CreateStaffFromRegistryModel } from '../../domain/models/create-staff-from-registry.model';
import { PromoteCitizenToStaffModel } from '../../domain/models/promote-citizen-to-staff.model';
import { StaffInfoModel } from '../../domain/models/staff-info.model';
import { CitizenLookupModel } from '../../domain/models/citizen-lookup.model';
import { BranchManagementRepository } from '../../../branch-management/domain/repositories/branch-management.repository';
import { HospitalManagementRepository } from '../../../hospital-management/domain/repositories/hospital-management.repository';
import { UpdateCitizenModel } from '../../domain/models/update-citizen.model';
import { UpdateStaffModel } from '../../domain/models/update-staff.model';

@Injectable()
export class UsersManagementFacade {
  constructor(
  private readonly repository: UsersManagementRepository,
  private readonly branchManagementRepository: BranchManagementRepository,
  private readonly hospitalManagementRepository: HospitalManagementRepository,
  public readonly store: UsersManagementStore,
  private readonly router: Router,
  ) {}

  changeTab(tab: UsersTabType): void {
    this.store.selectedTab.set(tab);
    this.store.resetPagination();
    this.loadUsers();
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.searchTerm.set(searchTerm);
    this.store.pageNumber.set(1);
    this.loadUsers();
  }

  changeStatusFilter(value: boolean | null): void {
    this.store.isActive.set(value);
    this.store.pageNumber.set(1);
    this.loadUsers();
  }

  changePage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.store.totalPages()) {
      return;
    }

    this.store.pageNumber.set(pageNumber);
    this.loadUsers();
  }

  lookupCitizenByNationalId(
    nationalId: string
  ): Observable<CitizenLookupModel> {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    return this.repository.lookupCitizenByNationalId(nationalId).pipe(
      finalize(() => this.store.loading.set(false))
    );
  }

  createStaffFromNationalRegistry(
    request: CreateStaffFromRegistryModel
  ): Observable<StaffInfoModel> {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    return this.repository.createStaffFromNationalRegistry(request).pipe(
      finalize(() => this.store.loading.set(false))
    );
  }

  promoteCitizenToStaff(
    userId: number,
    request: PromoteCitizenToStaffModel
  ): Observable<StaffInfoModel> {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    return this.repository.promoteCitizenToStaff(userId, request).pipe(
      finalize(() => this.store.loading.set(false))
    );
  }

  navigateToUsersManagement(): void {
    this.router.navigate(['/admin/users']);
  }
loadActiveBranches(): void {
  this.store.setActiveBranchesLoading(true);
  this.store.errorMessage.set(null);

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
      error: () => {
        this.store.errorMessage.set('Failed to load active branches.');
      }
    });
}

loadActiveHospitals(): void {
  this.store.setActiveHospitalsLoading(true);
  this.store.errorMessage.set(null);

  this.hospitalManagementRepository.getAllHospitals({
    pageNumber: 1,
    pageSize: 100,
    searchTerm: null,
    isActive: true,
    branchId: null
  })
    .pipe(finalize(() => this.store.setActiveHospitalsLoading(false)))
    .subscribe({
      next: result => {
        this.store.setActiveHospitals(result.items);
      },
      error: () => {
        this.store.errorMessage.set('Failed to load active hospitals.');
      }
    });
}
  loadUsersStatistics(): void {
    this.repository.getUsersStatistics().subscribe({
      next: (statistics) => {
        this.store.setStatistics(statistics);
      },
      error: () => {
        this.store.errorMessage.set('Failed to load users statistics.');
      },
    });
  }

  loadUsers(): void {
    const query = this.buildQuery();

    if (this.store.selectedTab() === 'staff') {
      this.loadStaff(query);
      return;
    }

    this.loadCitizens(query);
  }

  activateUser(userId: number): void {
    this.store.loading.set(true);

    this.repository
      .activateUser(userId)
      .pipe(finalize(() => this.store.loading.set(false)))
      .subscribe({
        next: () => {
          this.loadUsers();
          this.loadUsersStatistics();
        },
        error: () => this.store.errorMessage.set('Failed to activate user.'),
      });
  }

  deactivateUser(userId: number): void {
    this.store.loading.set(true);

    this.repository
      .deactivateUser(userId)
      .pipe(finalize(() => this.store.loading.set(false)))
      .subscribe({
        next: () => {
          this.loadUsers();
          this.loadUsersStatistics();
        },
        error: () => this.store.errorMessage.set('Failed to deactivate user.'),
      });
  }

  softDeleteUser(userId: number): void {
    this.store.loading.set(true);

    this.repository
      .softDeleteUser(userId)
      .pipe(finalize(() => this.store.loading.set(false)))
      .subscribe({
        next: () => {
          this.loadUsers();
          this.loadUsersStatistics();
        },
        error: () => this.store.errorMessage.set('Failed to delete user.'),
      });
  }
  loadStaffById(userId: number): void {
  this.store.loading.set(true);
  this.store.errorMessage.set(null);

  this.repository.getStaffById(userId)
    .pipe(finalize(() => this.store.loading.set(false)))
    .subscribe({
      next: staff => {
        this.store.selectedStaff.set(staff);
      },
      error: () => {
        this.store.errorMessage.set('Failed to load staff details.');
      }
    });
}

loadCitizenById(userId: number): void {
  this.store.loading.set(true);
  this.store.errorMessage.set(null);

  this.repository.getCitizenById(userId)
    .pipe(finalize(() => this.store.loading.set(false)))
    .subscribe({
      next: citizen => {
        this.store.selectedCitizen.set(citizen);
      },
      error: () => {
        this.store.errorMessage.set('Failed to load citizen details.');
      }
    });
}

updateStaff(
  userId: number,
  request: UpdateStaffModel,
  onSuccess?: () => void
): void {
  this.store.loading.set(true);
  this.store.errorMessage.set(null);

  this.repository.updateStaff(userId, request)
    .pipe(finalize(() => this.store.loading.set(false)))
    .subscribe({
      next: staff => {
        this.store.selectedStaff.set(staff);
        this.loadUsersStatistics();
        onSuccess?.();
      },
      error: error => {
        this.store.errorMessage.set(error?.message ?? 'Failed to update staff.');
      }
    });
}

updateCitizen(
  userId: number,
  request: UpdateCitizenModel,
  onSuccess?: () => void
): void {
  this.store.loading.set(true);
  this.store.errorMessage.set(null);

  this.repository.updateCitizen(userId, request)
    .pipe(finalize(() => this.store.loading.set(false)))
    .subscribe({
      next: citizen => {
        this.store.selectedCitizen.set(citizen);
        this.loadUsersStatistics();
        onSuccess?.();
      },
      error: error => {
        this.store.errorMessage.set(error?.message ?? 'Failed to update citizen.');
      }
    });
}

  private loadStaff(query: UserManagementQueryModel): void {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    this.repository
      .getAllStaffUsers(query)
      .pipe(finalize(() => this.store.loading.set(false)))
      .subscribe({
        next: (result) => {
          this.store.staffUsers.set(result.items);
          this.store.setPagination(
            result.pageNumber,
            result.pageSize,
            result.totalCount,
            result.totalPages,
          );
        },
        error: () => {
          this.store.errorMessage.set('Failed to load staff users.');
        },
      });
  }

  private loadCitizens(query: UserManagementQueryModel): void {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    this.repository
      .getAllCitizenUsers(query)
      .pipe(finalize(() => this.store.loading.set(false)))
      .subscribe({
        next: (result) => {
          this.store.citizenUsers.set(result.items);
          this.store.setPagination(
            result.pageNumber,
            result.pageSize,
            result.totalCount,
            result.totalPages,
          );
        },
        error: () => {
          this.store.errorMessage.set('Failed to load citizen users.');
        },
      });
  }

  private buildQuery(): UserManagementQueryModel {
    return {
      searchTerm: this.store.searchTerm() || null,
      isActive: this.store.isActive(),
      pageNumber: this.store.pageNumber(),
      pageSize: this.store.pageSize(),
    };
  }
}
