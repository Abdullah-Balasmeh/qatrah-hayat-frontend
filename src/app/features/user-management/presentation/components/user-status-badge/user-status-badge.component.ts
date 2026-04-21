import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-status-badge',
  imports: [CommonModule, TranslateModule],
  templateUrl: './user-status-badge.component.html',
  styleUrl: './user-status-badge.component.css'
})
export class UserStatusBadgeComponent {
  readonly isActive = input.required<boolean>();
}
