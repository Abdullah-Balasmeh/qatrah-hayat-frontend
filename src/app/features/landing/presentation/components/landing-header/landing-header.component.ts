import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import AOS from 'aos';
@Component({
  selector: 'app-landing-header',
  imports: [TranslateModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent{

  langService = inject(LanguageService);
  isArabic = signal<boolean>(this.langService.currentLang === 'ar');

   async toggleLanguage(): Promise<void> {
    await this.langService.switchLanguage();
    this.isArabic.set(this.langService.currentLang === 'ar');
  }


}
