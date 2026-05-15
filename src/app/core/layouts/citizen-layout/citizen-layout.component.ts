import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { HeaderNavItem } from '../../../shared/types/header-nav-item.types';
import { SideBarItem } from '../../../shared/types/slid-bar-item.type';

@Component({
  selector: 'app-citizen-layout',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent],
  templateUrl: './citizen-layout.component.html',
  styleUrl: './citizen-layout.component.css'
})
export class CitizenLayoutComponent{
 isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }


    navItems: HeaderNavItem[] = [
    {
      labelKey: 'User-Keys.DASHBOARD',
      routerLink: '/user/dashboard',
      exact: true,
      delay: 180,
    },
    {
      labelKey: 'User-Keys.DonateBlood',
      routerLink: '/user/donate',
      exact: true,
      delay: 230,
    },
    {
      labelKey: 'User-Keys.BLOOD_REQUEST',
      routerLink: '/user/requests',
      exact: true,
      delay: 280,
    },

    {
      labelKey: 'User-Keys.CAMPAIGNS',
      routerLink: '/user/campaigns',
      exact: true,
      delay: 330,
    },

  ];

  dashboardSideBarItems:SideBarItem[] = [
    {
      sectionTitle:"User-Keys.MAIN",
      sectionItems: [
        {
          labelKey:"User-Keys.DASHBOARD",
          routerLink:"/user/dashboard",
          icon:"fa-house",
          exact:true,
          delay:180,
        },
        {
          labelKey:"User-Keys.MY_PROFILE",
          routerLink:"/user/profile",
          icon:"fa-user",
          exact:true,
          delay:230,
        },
        {
          labelKey:"User-Keys.EligibilityStatus",
          routerLink:"/user/eligibility",
          icon:"fa-shield-heart",
          exact:true,
          delay:280,
        },
      ]
    },
    {
      sectionTitle:"User-Keys.Donation",
      sectionItems: [
        {
          labelKey:"User-Keys.DonateBlood",
          routerLink:"/user/donate",
          icon:"fa-droplet",
          exact:true,
          delay:180,
        },
        {
          labelKey:"User-Keys.MY_DONATIONS",
          routerLink:"/user/donations",
          icon:"fa-hand-holding-medical",
          exact:true,
          delay:230,
        },
      ]
    },
        {
      sectionTitle:"User-Keys.REQUESTS",
      sectionItems: [
        {
          labelKey:"User-Keys.Create_Blood_Request",
          routerLink:"/user/blood-request/create",
          icon:"fa-file-circle-plus",
          exact:true,
          delay:180,
        },
        {
          labelKey:"User-Keys.MY_REQUESTS",
          routerLink:"/user/requests",
          icon:"fa-file-lines",
          exact:true,
          delay:230,
        },
      ]
    },
    {
      sectionTitle:"User-Keys.Services",
      sectionItems: [
        {
           labelKey:"User-Keys.CAMPAIGNS",
          routerLink:"/user/campaigns",
          icon:"fa-bullhorn",
          exact:true,
          delay:480,
        },
        {
           labelKey:"User-Keys.NOTIFICATIONS",
          routerLink:"/user/notifications",
          icon:"fa-bell",
          exact:true,
          delay:480,
        },

        {
          labelKey:"User-Keys.SETTINGS",
          routerLink:"/user/settings",
          icon:"fa-gear",
          exact:true,
          delay:530,
        },
      ]
    }
  ]
}
