import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { UsersManagementFacade } from '../../facades/users-management.facade';
import { LoadingComponent } from '../../../../../shared/ui/loading/loading.component';
import { AlertErrorComponent } from '../../../../../shared/ui/alert-error/alert-error.component';
import { UserStatusBadgeComponent } from '../user-status-badge/user-status-badge.component';
import { LanguageService } from '../../../../../core/services/language.service';
import { BloodTypeEnum, BLOOD_TYPE_OPTIONS } from '../../../../../core/enums/blood-type-enum';
import { BloodTypeStatus, BLOOD_TYPE_STATUS_OPTIONS } from '../../../../../core/enums/blood-type-status.enum';
import { EligibilityStatus, ELIGIBILITY_STATUS_OPTIONS } from '../../../../../core/enums/eligibility-status.enum';

@Component({
  selector: 'app-citizen-details-card',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    LoadingComponent,
    AlertErrorComponent,
    UserStatusBadgeComponent
  ],
  templateUrl: './citizen-details-card.component.html',
  styleUrl: './citizen-details-card.component.css'
})
export class CitizenDetailsCardComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(UsersManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.facade.loadCitizenById(id);
    }
  }
getBloodTypeLabel(value: BloodTypeEnum | number | null): string {
  if (value === null || value === undefined) {
    return '—';
  }

  return BLOOD_TYPE_OPTIONS.find(option => option.value === Number(value))?.label ?? '—';
}

getBloodTypeStatusLabel(value: BloodTypeStatus | number | null): string {
  if (value === null || value === undefined) {
    return '—';
  }

  return BLOOD_TYPE_STATUS_OPTIONS.find(option => option.value === Number(value))?.label ?? '—';
}

getEligibilityStatusLabel(value: EligibilityStatus | number | null): string {
  if (value === null || value === undefined) {
    return '—';
  }

  return ELIGIBILITY_STATUS_OPTIONS.find(option => option.value === Number(value))?.label ?? '—';
}
  formatDate(value: string | null): string {
    if (!value) {
      return '—';
    }

    const normalizedDate = value.endsWith('Z') ? value : `${value}Z`;

    return new Date(normalizedDate).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}
