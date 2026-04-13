import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeaderComponent } from "../../../features/landing/presentation/components/landing-header/landing-header.component";

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, LandingHeaderComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {

}
