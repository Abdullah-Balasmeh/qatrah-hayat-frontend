import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthHeaderComponent } from "../../../features/auth/presentation/components/auth-header/auth-header.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, FooterComponent, AuthHeaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
