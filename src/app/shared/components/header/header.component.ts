import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationButtonComponent } from '../../ui/notification-button/notification-button.component';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, CommonModule, RouterLink, RouterLinkActive, NotificationButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 @Output() menuToggle = new EventEmitter<void>();
  langService = inject(LanguageService);

  isArabic = signal<boolean>(this.langService.currentLang === 'ar');

   async toggleLanguage(): Promise<void> {
    await this.langService.switchLanguage();
    this.isArabic.set(this.langService.currentLang === 'ar');
  }



  toggleSidebar(): void {
    this.menuToggle.emit();
  }

}
