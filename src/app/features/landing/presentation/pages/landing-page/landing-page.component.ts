import { Component } from '@angular/core';
import { LandingHeaderComponent } from "../../components/landing-header/landing-header.component";
import { LandingHeroComponent } from '../../components/landing-hero/landing-hero.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  imports: [LandingHeroComponent, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
