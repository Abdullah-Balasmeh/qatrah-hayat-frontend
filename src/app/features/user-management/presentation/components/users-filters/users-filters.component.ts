import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from "../../../../../shared/ui/search-bar/search-bar.component";
import { TranslateModule } from '@ngx-translate/core';
import { DropdownOption, AppFilterButtonComponent } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';
export type UserStatusFilter = 'all' | 'active' | 'inactive';
@Component({
  selector: 'app-users-filters',
  imports: [FormsModule, SearchBarComponent, TranslateModule, AppFilterButtonComponent],
  templateUrl: './users-filters.component.html',
  styleUrl: './users-filters.component.css'
})
export class UsersFiltersComponent {
 readonly searchValue = input.required<string>();
  readonly selectedStatus = input<UserStatusFilter>('all');

  readonly searchValueChanged = output<string>();
  readonly searchSubmitted = output<void>();
  readonly statusChanged = output<UserStatusFilter>();

  readonly statusOptions: DropdownOption<UserStatusFilter>[] = [
    {
      value: 'all',
      label: 'Admin-Keys.ALL_STATUS',
      icon: 'fa-solid fa-layer-group'
    },
    {
      value: 'active',
      label: 'Admin-Keys.ACTIVE_ONLY',
      icon: 'fa-solid fa-user-check'
    },
    {
      value: 'inactive',
      label: 'Admin-Keys.INACTIVE_ONLY',
      icon: 'fa-solid fa-user-slash'
    }
  ];

  onSearchValueChange(value: string): void {
    this.searchValueChanged.emit(value);
  }

  onSearch(): void {
    this.searchSubmitted.emit();
  }

  onStatusChange(value: UserStatusFilter): void {
    this.statusChanged.emit(value);
  }
}
