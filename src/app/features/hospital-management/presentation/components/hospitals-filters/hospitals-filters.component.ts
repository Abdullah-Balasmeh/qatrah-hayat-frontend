import { Component, input, output } from '@angular/core';
import { DropdownOption, AppFilterButtonComponent } from '../../../../../shared/ui/app-filter-button/app-filter-button.component';
import { SearchBarComponent } from "../../../../../shared/ui/search-bar/search-bar.component";
import { TranslateModule } from '@ngx-translate/core';

export type HospitalStatusFilter = 'all' | 'active' | 'inactive';

@Component({
  selector: 'app-hospitals-filters',
  imports: [AppFilterButtonComponent, SearchBarComponent , TranslateModule],
  templateUrl: './hospitals-filters.component.html',
  styleUrl: './hospitals-filters.component.css'
})
export class HospitalsFiltersComponent {
readonly searchValue = input.required<string>();
  readonly selectedStatus = input<HospitalStatusFilter>('all');

  readonly searchValueChanged = output<string>();
  readonly searchSubmitted = output<void>();
  readonly statusChanged = output<HospitalStatusFilter>();

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

readonly statusOptions: DropdownOption<HospitalStatusFilter>[] = [
  {
    value: 'all',
    label: 'Hospitals-Management-Keys.ALL_STATUSES',
    icon: 'fa-solid fa-layer-group'
  },
  {
    value: 'active',
    label: 'Hospitals-Management-Keys.ACTIVE_HOSPITALS',
    icon: 'fa-solid fa-circle-check'
  },
  {
    value: 'inactive',
    label: 'Hospitals-Management-Keys.INACTIVE_HOSPITALS',
    icon: 'fa-solid fa-circle-xmark'
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

  onStatusChange(value: HospitalStatusFilter): void {
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
