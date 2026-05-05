import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LanguageService } from '../../../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationButtonComponent } from "../../../../../shared/components/notification-button/notification-button.component";

@Component({
  selector: 'app-user-header',
  imports: [TranslateModule, CommonModule, RouterLink, RouterLinkActive, NotificationButtonComponent],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  langService = inject(LanguageService);

  async toggleLanguage() {
    await this.langService.switchLanguage();
  }



  toggleSidebar(): void {
    this.menuToggle.emit();
  }

}
