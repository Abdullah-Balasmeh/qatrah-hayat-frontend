import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HospitalManagementFacade } from '../../facades/hospital-management.facade';
import { LanguageService } from '../../../../../core/services/language.service';

import { LoadingComponent } from '../../../../../shared/ui/loading/loading.component';
import { AlertErrorComponent } from '../../../../../shared/ui/alert-error/alert-error.component';
import { HospitalStatusBadgeComponent } from '../hospital-status-badge/hospital-status-badge.component';

@Component({
  selector: 'app-hospital-details-card',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    LoadingComponent,
    AlertErrorComponent,
    HospitalStatusBadgeComponent
  ],
  templateUrl: './hospital-details-card.component.html',
  styleUrl: './hospital-details-card.component.css'
})
export class HospitalDetailsCardComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(HospitalManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.facade.loadHospitalById(id);
    }
  }

  formatDate(value: string | null): string {
    if (!value) {
      return '—';
    }

    const normalizedDate = value.endsWith('Z')
      ? value
      : `${value}Z`;

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
