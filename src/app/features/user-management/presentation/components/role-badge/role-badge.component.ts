import { Component, input } from '@angular/core';
import { USER_ROLE_LABELS, UserRole } from '../../../../../core/enums/user-role.enum';

@Component({
  selector: 'app-role-badge',
  imports: [],
  templateUrl: './role-badge.component.html',
  styleUrl: './role-badge.component.css'
})
export class RoleBadgeComponent {
  readonly role = input.required<UserRole>();

  get roleLabel(): string {
    return USER_ROLE_LABELS[this.role()] ?? 'Unknown';
  }
}
