import { Component, input } from '@angular/core';
import { StatCardComponent } from "../../../../../shared/ui/stat-card/stat-card.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-branches-statistics-section',
  imports: [StatCardComponent, TranslateModule],
  templateUrl: './branches-statistics-section.component.html',
  styleUrl: './branches-statistics-section.component.css'
})
export class BranchesStatisticsSectionComponent {
  readonly totalBranches = input.required<number>();
  readonly totalActiveBranches  = input.required<number>();
  readonly totalInactiveBranches = input.required<number>();
  readonly lastUpdate = input.required<string>();
}

