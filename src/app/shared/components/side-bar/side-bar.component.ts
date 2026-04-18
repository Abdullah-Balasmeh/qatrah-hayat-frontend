import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
import { getUserInitials } from '../../../core/utils/helper/get-user-initials.helper';
import { AuthFacade } from '../../../features/auth/presentation/facades/auth.facade';
import { SideBarItem } from '../../types/slid-bar-item.type';

@Component({
  selector: 'app-side-bar',
  imports: [TranslateModule, CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Input() isOpen = false;
  @Input() items: SideBarItem[] = [];
  @Output() closeSidebar = new EventEmitter<void>();
  readonly authFacade = inject(AuthFacade);
  readonly langService = inject(LanguageService);

  close(): void {
    this.closeSidebar.emit();
  }

  get isArabic(): boolean {
    return this.langService.currentLang === 'ar';
  }

  getUserAvatar(fullName: string | null | undefined): string {
    return getUserInitials(fullName);
  }

  onLogout(): void {
    this.authFacade.logoutStaff();
  }
}
