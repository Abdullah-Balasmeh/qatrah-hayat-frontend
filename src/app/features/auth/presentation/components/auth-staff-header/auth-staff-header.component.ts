import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-staff-header',
  imports: [TranslateModule, CommonModule],
  templateUrl: './auth-staff-header.component.html',
  styleUrl: './auth-staff-header.component.css'
})
export class AuthStaffHeaderComponent {
  langService = inject(LanguageService);
  isArabic = signal<boolean>(this.langService.currentLang === 'ar');

   async toggleLanguage(): Promise<void> {
    await this.langService.switchLanguage();
    this.isArabic.set(this.langService.currentLang === 'ar');
  }
}
