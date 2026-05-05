import { Component } from '@angular/core';
import { StatusCardDashboardComponent } from '../../components/status-card-dashboard/status-card-dashboard.component';
import { UrgentBloodNeedsComponent } from '../../components/urgent-blood-needs/urgent-blood-needs.component';
import { UserHeroComponent } from '../../components/user-hero/user-hero.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [UserHeroComponent, StatusCardDashboardComponent, UrgentBloodNeedsComponent, ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
