import { Component, computed, inject, input, output } from '@angular/core';
import { LanguageService } from '../../../../../core/services/language.service';
import { HospitalResponseModel } from '../../../domain/models/hospital-response.model';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { HospitalStatusBadgeComponent } from '../hospital-status-badge/hospital-status-badge.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hospitals-table',
  imports: [RouterLink,
    TranslateModule,
    HospitalStatusBadgeComponent , DatePipe],
  templateUrl: './hospitals-table.component.html',
  styleUrl: './hospitals-table.component.css'
})
export class HospitalsTableComponent {
   readonly hospitals = input.required<HospitalResponseModel[]>();

  readonly activateClicked = output<number>();
  readonly deactivateClicked = output<number>();
  readonly deleteClicked = output<number>();

  private readonly languageService = inject(LanguageService);

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });
}
