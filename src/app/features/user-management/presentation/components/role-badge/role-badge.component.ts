import { Component, input } from '@angular/core';
import { USER_ROLE_OPTIONS, UserRole } from '../../../../../core/enums/user-role.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-role-badge',
  imports: [TranslateModule],
  templateUrl: './role-badge.component.html',
  styleUrl: './role-badge.component.css'
})
export class RoleBadgeComponent {
 readonly role = input.required<UserRole>();

   get roleTranslationKey(): string {
    return USER_ROLE_OPTIONS[this.role()] ?? 'Role-Keys.UNKNOWN_ROLE';
  }
}
