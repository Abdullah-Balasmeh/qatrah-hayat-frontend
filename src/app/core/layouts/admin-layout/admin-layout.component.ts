import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { HeaderNavItem } from '../../../shared/types/header-nav-item.types';
import { SideBarItem } from '../../../shared/types/slid-bar-item.type';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
 isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }


    navItems: HeaderNavItem[] = [
    {
      labelKey: 'Admin-Keys.DASHBOARD',
      routerLink: '/admin/dashboard',
      exact: true,
      delay: 180,
    },
    {
      labelKey: 'Admin-Keys.USERS',
      routerLink: '/admin/users',
      exact: true,
      delay: 230,
    },
    {
      labelKey: 'Landing-Header-Keys.CAMPAIGNS',
      routerLink: '/campaigns',
      exact: true,
      delay: 280,
    },
    {
      labelKey: 'Admin-Keys.BRANCHES',
      routerLink: '/admin/branches',
      exact: true,
      delay: 330,
    },
    {
      labelKey: 'Admin-Keys.HOSPITALS',
      routerLink: '/admin/hospitals',
      exact: true,
      delay: 380,
    },
  ];

  dashboardSideBarItems:SideBarItem[] = [
    {
      sectionTitle:"Admin-Keys.MAIN",
      sectionItems: [
        {
          labelKey:"Admin-Keys.DASHBOARD",
          routerLink:"/admin/dashboard",
          icon:"fa-house",
          exact:true,
          delay:180,
        },
        {
          labelKey:"Admin-Keys.MY_PROFILE",
          routerLink:"/admin/profile",
          icon:"fa-user",
          exact:true,
          delay:230,
        },
        {
          labelKey:"Admin-Keys.USERS",
          routerLink:"/admin/users",
          icon:"fa-users",
          exact:true,
          delay:280,
        },
        {
          labelKey:"Landing-Header-Keys.CAMPAIGNS",
          routerLink:"/campaigns",
          icon:"fa-bullhorn",
          exact:true,
          delay:330,
        },
        {
          labelKey:"Admin-Keys.BRANCHES",
          routerLink:"/admin/branches",
          icon:"fa-building",
          exact:true,
          delay:380,
        },
        {
          labelKey:"Admin-Keys.HOSPITALS",
          routerLink:"/admin/hospitals",
          icon:"fa-hospital",
          exact:true,
          delay:430,
        },
      ]
    },
    {
      sectionTitle:"Admin-Keys.SERVICES",
      sectionItems: [
        {
           labelKey:"Admin-Keys.REPORTS",
          routerLink:"/admin/reports",
          icon:"fa-file",
          exact:true,
          delay:480,
        },
        {
           labelKey:"Admin-Keys.NOTIFICATIONS",
          routerLink:"/admin/notifications",
          icon:"fa-bell",
          exact:true,
          delay:480,
        },

        {
          labelKey:"Admin-Keys.SETTINGS",
          routerLink:"/admin/settings",
          icon:"fa-gear",
          exact:true,
          delay:530,
        },
      ]
    }
  ]
}
