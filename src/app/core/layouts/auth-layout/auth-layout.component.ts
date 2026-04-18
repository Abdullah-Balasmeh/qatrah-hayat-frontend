import {Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthStaffHeaderComponent } from "../../../features/auth/presentation/components/auth-staff-header/auth-staff-header.component";
import { AuthHeaderComponent } from "../../../features/auth/presentation/components/auth-header/auth-header.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, FooterComponent, AuthStaffHeaderComponent, AuthHeaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {
isStaff = signal<boolean>(false);
private readonly router = inject(Router);
  constructor() {
    this.updateIsStaff(this.router.url);

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateIsStaff(event.urlAfterRedirects);
      });
  }

  private updateIsStaff(url: string): void {
    this.isStaff.set(url.includes('/auth/staff-login'));
  }

}
