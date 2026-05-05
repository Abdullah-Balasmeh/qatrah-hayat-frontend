import { LanguageService } from './../../../../../core/services/language.service';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { StaffInfoModel } from '../../../domain/models/staff-info.model';
import { RouterLink } from '@angular/router';
import { RoleBadgeComponent } from '../role-badge/role-badge.component';
import { UserStatusBadgeComponent } from '../user-status-badge/user-status-badge.component';
import { UserRole } from '../../../../../core/enums/user-role.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-staff-users-table',
  imports: [RouterLink, RoleBadgeComponent, UserStatusBadgeComponent, TranslateModule],
  templateUrl: './staff-users-table.component.html',
  styleUrl: './staff-users-table.component.css'
})
export class StaffUsersTableComponent {
  readonly users = input.required<StaffInfoModel[]>();
  readonly languageService = inject(LanguageService);

  readonly isArabic = computed(() => {
    return this.languageService.currentLangSignal() === 'ar';
  });

  readonly activateClicked = output<number>();
  readonly deactivateClicked = output<number>();
  readonly deleteClicked = output<number>();

  private readonly staffRoles: UserRole[] = [
    UserRole.Admin,
    UserRole.Doctor,
    UserRole.Employee,
    UserRole.BranchManager
  ];

  getStaffRoles(roles: UserRole[]): UserRole[] {
    return roles.filter(role => this.staffRoles.includes(role));
  }
}
