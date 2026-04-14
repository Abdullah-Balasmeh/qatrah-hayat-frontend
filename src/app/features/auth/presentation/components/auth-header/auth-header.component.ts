import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-auth-header',
  imports: [TranslateModule, CommonModule, RouterLink],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.css'
})
export class AuthHeaderComponent {
  langService = inject(LanguageService);
  isArabic = signal<boolean>(this.langService.currentLang === 'ar');

   async toggleLanguage(): Promise<void> {
    await this.langService.switchLanguage();
    this.isArabic.set(this.langService.currentLang === 'ar');
  }
}
