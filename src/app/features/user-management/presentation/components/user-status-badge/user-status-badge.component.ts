import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-status-badge',
  imports: [],
  templateUrl: './user-status-badge.component.html',
  styleUrl: './user-status-badge.component.css'
})
export class UserStatusBadgeComponent {
  readonly isActive = input.required<boolean>();
}
