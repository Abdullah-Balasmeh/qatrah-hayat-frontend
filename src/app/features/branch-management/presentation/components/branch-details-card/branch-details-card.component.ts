import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BranchManagementFacade } from '../../facades/branch-management.facade';
import { LanguageService } from '../../../../../core/services/language.service';
import { LoadingComponent } from '../../../../../shared/ui/loading/loading.component';
import { AlertErrorComponent } from '../../../../../shared/ui/alert-error/alert-error.component';
import { BranchStatusBadgeComponent } from '../branch-status-badge/branch-status-badge.component';

@Component({
  selector: 'app-branch-details-card',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    LoadingComponent,
    AlertErrorComponent,
    BranchStatusBadgeComponent
  ],
  templateUrl: './branch-details-card.component.html',
  styleUrl: './branch-details-card.component.css'
})
export class BranchDetailsCardComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(BranchManagementFacade);
  private readonly languageService = inject(LanguageService);

  readonly store = this.facade.store;

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.facade.loadBranchById(id);
    }
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

  formatTime(value: string): string {
    if (!value) {
      return '—';
    }

    const normalized = value.substring(0, 5);
    const [hourText, minuteText] = normalized.split(':');

    const date = new Date();
    date.setHours(Number(hourText), Number(minuteText));

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}
