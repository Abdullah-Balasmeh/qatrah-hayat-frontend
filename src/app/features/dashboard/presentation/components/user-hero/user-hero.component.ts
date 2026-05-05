import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../core/services/language.service';
import { getUserInitialsTwoPart } from '../../../../../core/utils/helper/get-user-initials.helper';
import { AuthStore } from '../../../../auth/presentation/store/auth.store';

@Component({
  selector: 'app-user-hero',
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './user-hero.component.html',
  styleUrl: './user-hero.component.css'
})
export class UserHeroComponent {
  readonly langService = inject(LanguageService);
  readonly authStore = inject(AuthStore);

  get isArabic(): boolean {
    return this.langService.currentLang === 'ar';
  }

  getUserNameTwoPart(fullName: string | null | undefined): string {
    return getUserInitialsTwoPart(fullName);
  }
}
