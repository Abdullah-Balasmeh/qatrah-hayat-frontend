import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-branch-status-badge',
  imports: [TranslateModule],
  templateUrl: './branch-status-badge.component.html',
  styleUrl: './branch-status-badge.component.css'
})
export class BranchStatusBadgeComponent {
  readonly isActive = input.required<boolean>();
}
