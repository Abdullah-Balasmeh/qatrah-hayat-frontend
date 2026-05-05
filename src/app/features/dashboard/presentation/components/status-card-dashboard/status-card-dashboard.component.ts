import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

interface StatCard {
  title: string;
  value: string | number;
  iconClass: string;
  iconWrapperClass: string;
  valueClass?: string;
}
@Component({
  selector: 'app-status-card-dashboard',
  imports: [CommonModule],
  templateUrl: './status-card-dashboard.component.html',
  styleUrl: './status-card-dashboard.component.css'
})
export class StatusCardDashboardComponent {
  private readonly translate = inject(TranslateService);
  stats: StatCard[] = [
    {
      title: this.translate.instant('Unread'),
      value: 5,
      iconClass: 'fa-solid fa-bell',
      iconWrapperClass: 'icon-box icon-blue'
    },
    {
      title: this.translate.instant('Active_Requests'),
      value: 2,
      iconClass: 'fa-solid fa-list-check',
      iconWrapperClass: 'icon-box icon-yellow'
    },
    {
      title: this.translate.instant('Current_Status'),
      value: this.translate.instant('EligibilityStatusOpts.Eligible'),
      iconClass: 'fa-solid fa-circle-check',
      iconWrapperClass: 'icon-box icon-green',
      valueClass: 'status-text'
    },
    {
      title: this.translate.instant('Total_Donations'),
      value: 4,
      iconClass: 'fa-solid fa-droplet',
      iconWrapperClass: 'icon-box icon-pink'
    }
  ];
}
