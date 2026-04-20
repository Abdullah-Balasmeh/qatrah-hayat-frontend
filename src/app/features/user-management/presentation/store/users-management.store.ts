import { Injectable, signal } from '@angular/core';
import { StaffInfoResponseModel } from '../../domain/models/staff-info-response.model';
import { CitizenInfoResponseModel } from '../../domain/models/citizen-info-response.model';
import { UsersStatisticsResponseModel } from '../../domain/models/users-statistics-response.model';

export type UsersTabType = 'staff' | 'citizens';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementStore {
  readonly selectedTab = signal<UsersTabType>('staff');

  readonly staffUsers = signal<StaffInfoResponseModel[]>([]);
  readonly citizenUsers = signal<CitizenInfoResponseModel[]>([]);
  readonly totalUsers = signal(0);
readonly totalStaff = signal(0);
readonly totalCitizens = signal(0);
readonly lastUpdate = signal<string | null>(null);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly totalCount = signal(0);
  readonly totalPages = signal(0);

  readonly searchTerm = signal('');
  readonly isActive = signal<boolean | null>(null);

  setPagination(pageNumber: number, pageSize: number, totalCount: number, totalPages: number): void {
    this.pageNumber.set(pageNumber);
    this.pageSize.set(pageSize);
    this.totalCount.set(totalCount);
    this.totalPages.set(totalPages);
  }
  setStatistics(statistics: UsersStatisticsResponseModel): void {
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
