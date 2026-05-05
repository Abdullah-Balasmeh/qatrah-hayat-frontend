import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donate-page',
  imports: [TranslateModule, CommonModule],
  templateUrl: './donate-page.component.html',
  styleUrl: './donate-page.component.css'
})
export class DonatePageComponent {
donationTypes = [
  {
    titleKey: 'DONATE_PAGE.PRIVATE_DONATION',
    descKey: 'DONATE_PAGE.PRIVATE_DONATION_DESC',
    badgeKey: 'DONATE_PAGE.PRIVATE_BADGE',
    image: 'assets/images/blood_request.svg',
    featured: false
  },
  {
    titleKey: 'DONATE_PAGE.GENERAL_DONATION',
    descKey: 'DONATE_PAGE.GENERAL_DONATION_DESC',
    badgeKey: 'DONATE_PAGE.GENERAL_BADGE',
    image: 'assets/images/donation.svg',
    featured: true
  },
  {
    titleKey: 'DONATE_PAGE.CAMPAIGN_DONATION',
    descKey: 'DONATE_PAGE.CAMPAIGN_DONATION_DESC',
    badgeKey: 'DONATE_PAGE.CAMPAIGN_BADGE',
    image: 'assets/images/campaigns.svg',
    featured: false
  }
];
}
