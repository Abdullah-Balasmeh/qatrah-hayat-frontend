import { Injectable, signal } from '@angular/core';

import { StaffInfoModel } from '../../domain/models/staff-info.model';
import { CitizenInfoModel } from '../../domain/models/citizen-info.model';
import { UsersStatisticsModel } from '../../domain/models/users-statistics.model';

import { BranchInfoModel } from '../../../branch-management/domain/models/branch-info.model';
import { HospitalModel } from '../../../hospital-management/domain/models/hospital.model';

export type UsersTabType = 'staff' | 'citizens';

@Injectable()
export class UsersManagementStore {
  readonly selectedTab = signal<UsersTabType>('staff');

  readonly staffUsers = signal<StaffInfoModel[]>([]);
  readonly citizenUsers = signal<CitizenInfoModel[]>([]);
  readonly selectedStaff = signal<StaffInfoModel | null>(null);
readonly selectedCitizen = signal<CitizenInfoModel | null>(null);

  readonly totalUsers = signal(0);
  readonly totalStaff = signal(0);
  readonly totalCitizens = signal(0);
  readonly lastUpdate = signal<string | null>(null);

  readonly activeBranches = signal<BranchInfoModel[]>([]);
  readonly activeHospitals = signal<HospitalModel[]>([]);

  readonly isActiveBranchesLoading = signal(false);
  readonly isActiveHospitalsLoading = signal(false);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly totalCount = signal(0);
  readonly totalPages = signal(0);

  readonly searchTerm = signal('');
  readonly isActive = signal<boolean | null>(null);

  setActiveBranches(branches: BranchInfoModel[]): void {
    this.activeBranches.set(branches);
  }

  setActiveHospitals(hospitals: HospitalModel[]): void {
    this.activeHospitals.set(hospitals);
  }

  setActiveBranchesLoading(value: boolean): void {
    this.isActiveBranchesLoading.set(value);
  }

  setActiveHospitalsLoading(value: boolean): void {
    this.isActiveHospitalsLoading.set(value);
  }

  setPagination(
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPages: number
  ): void {
    this.pageNumber.set(pageNumber);
    this.pageSize.set(pageSize);
    this.totalCount.set(totalCount);
    this.totalPages.set(totalPages);
  }

  setStatistics(statistics: UsersStatisticsModel): void {
    this.totalUsers.set(statistics.totalUsers);
    this.totalStaff.set(statistics.totalStaff);
    this.totalCitizens.set(statistics.totalCitizens);
    this.lastUpdate.set(statistics.lastUpdate);
  }

  resetPagination(): void {
    this.pageNumber.set(1);
    this.totalCount.set(0);
    this.totalPages.set(0);
  }
}
