import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppFilterButtonComponent, DropdownOption } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';
import { SearchBarComponent } from '../../../../../shared/ui/search-bar/search-bar.component';
export type BranchStatusFilter = 'all' | 'active' | 'inactive';
@Component({
  selector: 'app-branches-filters',
  imports: [    FormsModule,
    SearchBarComponent,
    TranslateModule,
    AppFilterButtonComponent],
  templateUrl: './branches-filters.component.html',
  styleUrl: './branches-filters.component.css'
})
export class BranchesFiltersComponent {
  readonly searchValue = input.required<string>();
  readonly selectedStatus = input<BranchStatusFilter>('all');

  readonly searchValueChanged = output<string>();
  readonly searchSubmitted = output<void>();
  readonly statusChanged = output<BranchStatusFilter>();

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  readonly statusOptions: DropdownOption<BranchStatusFilter>[] = [
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

    this.clearSearchDebounceTimer();

    this.searchDebounceTimer = setTimeout(() => {
      this.searchSubmitted.emit();
    }, 500);
  }

  onSearch(): void {
    this.clearSearchDebounceTimer();
    this.searchSubmitted.emit();
  }

  onStatusChange(value: BranchStatusFilter): void {
    this.statusChanged.emit(value);
  }

  ngOnDestroy(): void {
    this.clearSearchDebounceTimer();
  }

  private clearSearchDebounceTimer(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
  }
}
