import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import {
  UsersManagementStore,
  UsersTabType,
} from '../store/users-management.store';
import { UserManagementQueryModel } from '../../domain/models/user-management-query.model';
import { UsersManagementRepositoryImpl } from '../../data/repositories_impl/users-management.repository.impl';
import { Router } from '@angular/router';
import { CreateStaffFromRegistryRequestModel } from '../../domain/models/create-staff-from-registry-request.model';
import { PromoteCitizenToStaffRequestModel } from '../../domain/models/promote-citizen-to-staff-request.model';
import { StaffInfoResponseModel } from '../../domain/models/staff-info-response.model';
import { CitizenLookupResponseModel } from '../../domain/models/citizen-lookup-response.model';

@Injectable({
  providedIn: 'root',
})
export class UsersManagementFacade {
  constructor(
    private readonly repository: UsersManagementRepositoryImpl,
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
  ): Observable<CitizenLookupResponseModel> {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    return this.repository.lookupCitizenByNationalId(nationalId).pipe(
      finalize(() => this.store.loading.set(false))
    );
  }

  createStaffFromNationalRegistry(
    request: CreateStaffFromRegistryRequestModel
  ): Observable<StaffInfoResponseModel> {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    return this.repository.createStaffFromNationalRegistry(request).pipe(
      finalize(() => this.store.loading.set(false))
    );
  }

  promoteCitizenToStaff(
    userId: number,
    request: PromoteCitizenToStaffRequestModel
  ): Observable<StaffInfoResponseModel> {
    this.store.loading.set(true);
    this.store.errorMessage.set(null);

    return this.repository.promoteCitizenToStaff(userId, request).pipe(
      finalize(() => this.store.loading.set(false))
    );
  }

  navigateToUsersManagement(): void {
    this.loadUsersStatistics();
    this.router.navigate(['/admin/users']);
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
