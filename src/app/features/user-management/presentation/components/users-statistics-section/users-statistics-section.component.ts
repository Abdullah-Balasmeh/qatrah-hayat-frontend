import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StatCardComponent } from '../../../../../shared/ui/stat-card/stat-card.component';

@Component({
  selector: 'app-users-statistics-section',
  imports: [StatCardComponent, TranslateModule],
  templateUrl: './users-statistics-section.component.html',
  styleUrl: './users-statistics-section.component.css'
})
export class UsersStatisticsSectionComponent {
  readonly totalUsers = input.required<number>();
  readonly totalStaff = input.required<number>();
  readonly totalCitizens = input.required<number>();
  readonly lastUpdate = input.required<string>();
}
