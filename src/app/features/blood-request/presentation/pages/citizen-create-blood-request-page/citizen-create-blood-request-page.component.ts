import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-citizen-create-blood-request-page',
  imports: [CommonModule, TranslateModule],
  templateUrl: './citizen-create-blood-request-page.component.html',
  styleUrl: './citizen-create-blood-request-page.component.css'
})
export class CitizenCreateBloodRequestPageComponent {
  requestTypes = [
    {
      titleKey: 'Blood-Request-Create-Keys.SELF_REQUEST_TITLE',
      descKey: 'Blood-Request-Create-Keys.SELF_REQUEST_DESC',
      badgeKey: 'Blood-Request-Create-Keys.SELF_BADGE',
      image: 'assets/images/blood_request.svg',
      route: '/user/blood-request/create/self',
      featured: true
    },
    {
      titleKey: 'Blood-Request-Create-Keys.OTHER_REQUEST_TITLE',
      descKey: 'Blood-Request-Create-Keys.OTHER_REQUEST_DESC',
      badgeKey: 'Blood-Request-Create-Keys.OTHER_BADGE',
      image: 'assets/images/donation.svg',
      route: '/user/blood-request/create/other',
      featured: false
    }
  ];

  constructor(private readonly router: Router) {}

  goToRequestForm(route: string): void {
    this.router.navigateByUrl(route);
  }
}
