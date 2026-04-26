import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StatCardComponent } from "../../../../../shared/ui/stat-card/stat-card.component";

@Component({
  selector: 'app-hospitals-statistics-section',
  imports: [StatCardComponent, TranslateModule],
  templateUrl: './hospitals-statistics-section.component.html',
  styleUrl: './hospitals-statistics-section.component.css'
})
export class HospitalsStatisticsSectionComponent {
  readonly totalHospitals = input.required<number>();
  readonly totalActiveHospitals = input.required<number>();
  readonly totalInactiveHospitals = input.required<number>();
  readonly lastUpdate = input.required<string | null>();
}
