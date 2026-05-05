import { Component, computed, inject, input, output } from '@angular/core';
import { CitizenInfoModel } from '../../../domain/models/citizen-info.model';
import { UserStatusBadgeComponent } from '../user-status-badge/user-status-badge.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BloodTypeEnum } from '../../../../../core/enums/blood-type-enum';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-citizen-users-table',
  standalone: true,
  imports: [UserStatusBadgeComponent, TranslateModule, RouterLink, DatePipe],
  templateUrl: './citizen-users-table.component.html',
  styleUrl: './citizen-users-table.component.css'
})
export class CitizenUsersTableComponent {
readonly users = input.required<CitizenInfoModel[]>();

  readonly bloodTypeLabels = input.required<
    { value: BloodTypeEnum; label: string }[]
  >();

  readonly languageService = inject(LanguageService);

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  readonly activateClicked = output<number>();
  readonly deactivateClicked = output<number>();
  readonly deleteClicked = output<number>();

  getBloodTypeLabel(bloodType: BloodTypeEnum): string {
    return this.bloodTypeLabels().find(option => option.value === bloodType)?.label ?? '—';
  }
}
