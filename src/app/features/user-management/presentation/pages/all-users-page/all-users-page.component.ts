import { Component, computed, inject, OnInit } from '@angular/core';
import { USER_ROLE_OPTIONS } from '../../../../../core/enums/user-role.enum';
import { UsersManagementFacade } from '../../facades/users-management.facade';
import { GENDER_OPTIONS } from '../../../../../core/enums/gender-enum';
import { BLOOD_TYPE_OPTIONS } from '../../../../../core/enums/blood-type-enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UsersPaginationComponent } from "../../components/users-pagination/users-pagination.component";
import { CitizenUsersTableComponent } from "../../components/citizen-users-table/citizen-users-table.component";
import { StaffUsersTableComponent } from "../../components/staff-users-table/staff-users-table.component";
import { UsersFiltersComponent } from "../../components/users-filters/users-filters.component";
import { UsersTabsComponent } from "../../components/users-tabs/users-tabs.component";
import { UsersStatisticsSectionComponent } from "../../components/users-statistics-section/users-statistics-section.component";
import { UsersPageHeaderComponent } from "../../components/users-page-header/users-page-header.component";
import { LoadingComponent } from "../../../../../shared/ui/loading/loading.component";
import { UserStatusFilter } from '../../components/users-filters/users-filters.component';
import { AlertErrorComponent } from "../../../../../shared/ui/alert-error/alert-error.component";
@Component({
  selector: 'app-all-users-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    UsersPaginationComponent,
    CitizenUsersTableComponent,
    StaffUsersTableComponent,
    UsersFiltersComponent,
    UsersTabsComponent,
    UsersStatisticsSectionComponent,
    UsersPageHeaderComponent,
    LoadingComponent,
    AlertErrorComponent
],
  templateUrl: './all-users-page.component.html',
  styleUrl: './all-users-page.component.css'
})
export class AllUsersPageComponent implements OnInit {
  readonly bloodTypeLabels = BLOOD_TYPE_OPTIONS;
  readonly genderLabels = GENDER_OPTIONS;
  readonly roleLabels = USER_ROLE_OPTIONS;

  private readonly facade = inject(UsersManagementFacade);
  readonly store = this.facade.store;

  searchValue = '';

  readonly shownFrom = computed(() => {
    if (this.store.totalCount() === 0) {
      return 0;
    }

    return (this.store.pageNumber() - 1) * this.store.pageSize() + 1;
  });

  readonly shownTo = computed(() => {
    const possibleTo = this.store.pageNumber() * this.store.pageSize();
    return Math.min(possibleTo, this.store.totalCount());
  });

  readonly lastUpdateLabel = computed(() => {
    const lastUpdate = this.store.lastUpdate();

    if (!lastUpdate) {
      return '—';
    }

    return new Date(lastUpdate).toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  });

  readonly selectedStatus = computed<UserStatusFilter>(() => {
  const isActive = this.store.isActive();

  if (isActive === true) {
    return 'active';
  }

  if (isActive === false) {
    return 'inactive';
  }

  return 'all';
});

  ngOnInit(): void {
    this.facade.loadUsers();
    this.facade.loadUsersStatistics();
  }

  onTabChange(tab: 'staff' | 'citizens'): void {
    this.searchValue = '';
    this.store.searchTerm.set('');
    this.facade.changeTab(tab);
  }

  onSearch(): void {
    this.facade.changeSearchTerm(this.searchValue.trim());
  }

onStatusChange(value: UserStatusFilter): void {
  if (value === 'active') {
    this.facade.changeStatusFilter(true);
    return;
  }

  if (value === 'inactive') {
    this.facade.changeStatusFilter(false);
    return;
  }

  this.facade.changeStatusFilter(null);
}

  previousPage(): void {
    this.facade.changePage(this.store.pageNumber() - 1);
  }

  nextPage(): void {
    this.facade.changePage(this.store.pageNumber() + 1);
  }

  activateUser(userId: number): void {
    this.facade.activateUser(userId);
  }

  deactivateUser(userId: number): void {
    this.facade.deactivateUser(userId);
  }

  deleteUser(userId: number): void {
    this.facade.softDeleteUser(userId);
  }
}
