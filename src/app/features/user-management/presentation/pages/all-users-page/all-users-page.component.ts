import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { USER_ROLE_OPTIONS } from '../../../../../core/enums/user-role.enum';
import { UsersManagementFacade } from '../../facades/users-management.facade';
import { GENDER_OPTIONS } from '../../../../../core/enums/gender-enum';
import { BLOOD_TYPE_OPTIONS } from '../../../../../core/enums/blood-type-enum';

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

import {
  ConfirmationModalComponent,
  ConfirmationModalType
} from '../../../../../shared/ui/confirmation-modal/confirmation-modal.component';

type UserActionType = 'activate' | 'deactivate' | 'delete';

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
    AlertErrorComponent,
    ConfirmationModalComponent
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

  readonly selectedUserId = signal<number | null>(null);
  readonly selectedAction = signal<UserActionType | null>(null);
  readonly isConfirmationModalOpen = signal(false);

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

  const normalizedDate = lastUpdate.endsWith('Z')
    ? lastUpdate
    : `${lastUpdate}Z`;

  return new Date(normalizedDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
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

  readonly confirmationModalType = computed<ConfirmationModalType>(() => {
    switch (this.selectedAction()) {
      case 'delete':
        return 'danger';

      case 'deactivate':
        return 'warning';

      case 'activate':
        return 'success';

      default:
        return 'info';
    }
  });

  readonly confirmationModalTitle = computed(() => {
    switch (this.selectedAction()) {
      case 'delete':
        return 'Admin-Keys.CONFIRM_DELETE_USER_TITLE';

      case 'deactivate':
        return 'Admin-Keys.CONFIRM_DEACTIVATE_USER_TITLE';

      case 'activate':
        return 'Admin-Keys.CONFIRM_ACTIVATE_USER_TITLE';

      default:
        return 'Admin-Keys.CONFIRM_ACTION_TITLE';
    }
  });

  readonly confirmationModalMessage = computed(() => {
    switch (this.selectedAction()) {
      case 'delete':
        return 'Admin-Keys.CONFIRM_DELETE_USER_MESSAGE';

      case 'deactivate':
        return 'Admin-Keys.CONFIRM_DEACTIVATE_USER_MESSAGE';

      case 'activate':
        return 'Admin-Keys.CONFIRM_ACTIVATE_USER_MESSAGE';

      default:
        return 'Admin-Keys.CONFIRM_ACTION_MESSAGE';
    }
  });

  readonly confirmationModalConfirmText = computed(() => {
    switch (this.selectedAction()) {
      case 'delete':
        return 'Admin-Keys.DELETE';

      case 'deactivate':
        return 'Admin-Keys.DEACTIVATE';

      case 'activate':
        return 'Admin-Keys.ACTIVATE';

      default:
        return 'COMMON.CONFIRM';
    }
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
    this.openConfirmationModal('activate', userId);
  }

  deactivateUser(userId: number): void {
    this.openConfirmationModal('deactivate', userId);
  }

  deleteUser(userId: number): void {
    this.openConfirmationModal('delete', userId);
  }

  openConfirmationModal(action: UserActionType, userId: number): void {
    this.selectedAction.set(action);
    this.selectedUserId.set(userId);
    this.isConfirmationModalOpen.set(true);
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen.set(false);
    this.selectedAction.set(null);
    this.selectedUserId.set(null);
  }

  confirmUserAction(): void {
    const userId = this.selectedUserId();
    const action = this.selectedAction();

    if (!userId || !action) {
      return;
    }

    switch (action) {
      case 'activate':
        this.facade.activateUser(userId);
        break;

      case 'deactivate':
        this.facade.deactivateUser(userId);
        break;

      case 'delete':
        this.facade.softDeleteUser(userId);
        break;
    }

    this.closeConfirmationModal();
  }
}
