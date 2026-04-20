import { Component, input, output } from '@angular/core';
import { StaffInfoResponseModel } from '../../../domain/models/staff-info-response.model';
import { RouterLink } from '@angular/router';
import { RoleBadgeComponent } from '../role-badge/role-badge.component';
import { UserStatusBadgeComponent } from '../user-status-badge/user-status-badge.component';

@Component({
  selector: 'app-staff-users-table',
  imports: [RouterLink, RoleBadgeComponent, UserStatusBadgeComponent],
  templateUrl: './staff-users-table.component.html',
  styleUrl: './staff-users-table.component.css'
})
export class StaffUsersTableComponent {
  readonly users = input.required<StaffInfoResponseModel[]>();

  readonly activateClicked = output<number>();
  readonly deactivateClicked = output<number>();
  readonly deleteClicked = output<number>();
}
