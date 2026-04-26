import { Component, inject, OnInit } from '@angular/core';
import { HospitalManagementFacade } from '../../facades/hospital-management.facade';
import { HospitalStatusFilter } from '../../store/hospital-management.store';
import { ConfirmationModalComponent } from "../../../../../shared/ui/confirmation-modal/confirmation-modal.component";
import { UsersPaginationComponent } from "../../../../user-management/presentation/components/users-pagination/users-pagination.component";
import { AlertErrorComponent } from "../../../../../shared/ui/alert-error/alert-error.component";
import { LoadingComponent } from "../../../../../shared/ui/loading/loading.component";
import { TranslateModule } from '@ngx-translate/core';
import { HospitalsPageHeaderComponent } from "../../components/hospitals-page-header/hospitals-page-header.component";
import { HospitalsStatisticsSectionComponent } from "../../components/hospitals-statistics-section/hospitals-statistics-section.component";
import { HospitalsFiltersComponent } from "../../components/hospitals-filters/hospitals-filters.component";
import { HospitalsTableComponent } from "../../components/hospitals-table/hospitals-table.component";

@Component({
  selector: 'app-all-hospitals-page',
  imports: [TranslateModule, ConfirmationModalComponent, UsersPaginationComponent, AlertErrorComponent, LoadingComponent, HospitalsPageHeaderComponent, HospitalsStatisticsSectionComponent, HospitalsFiltersComponent, HospitalsTableComponent],
  templateUrl: './all-hospitals-page.component.html',
  styleUrl: './all-hospitals-page.component.css'
})
export class AllHospitalsPageComponent  implements OnInit{
 readonly facade = inject(HospitalManagementFacade);
  readonly store = this.facade.store;

  ngOnInit(): void {
    this.facade.loadInitialData();
  }

  onSearchValueChange(value: string): void {
    this.facade.updateSearchValue(value);
  }

  onSearch(): void {
    this.facade.searchHospitals();
  }

  onStatusChange(value: HospitalStatusFilter): void {
    this.facade.updateStatusFilter(value);
  }

  onBranchChange(branchId: number | null): void {
    this.facade.updateBranchFilter(branchId);
  }

  previousPage(): void {
    this.facade.previousPage();
  }

  nextPage(): void {
    this.facade.nextPage();
  }

  openActivateConfirmation(hospitalId: number): void {
    this.facade.openActivateConfirmation(hospitalId);
  }

  openDeactivateConfirmation(hospitalId: number): void {
    this.facade.openDeactivateConfirmation(hospitalId);
  }

  openDeleteConfirmation(hospitalId: number): void {
    this.facade.openDeleteConfirmation(hospitalId);
  }

  confirmHospitalAction(): void {
    this.facade.confirmHospitalAction();
  }

  closeConfirmationModal(): void {
    this.facade.closeConfirmationModal();
  }
}
