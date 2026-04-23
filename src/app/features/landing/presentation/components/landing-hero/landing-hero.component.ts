import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-hero',
  imports: [TranslateModule,CommonModule,RouterLink],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.css'
})
export class LandingHeroComponent {

}
