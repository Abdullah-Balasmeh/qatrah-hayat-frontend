import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

type Lang = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly key = 'lang';
  private translate = inject(TranslateService);
  async init(): Promise<void> {
    const savedLang = this.getSavedLanguage();
    const langToUse: Lang = savedLang ?? 'ar';

    this.translate.setFallbackLang('ar');
    await firstValueFrom(this.translate.use(langToUse));

    document.documentElement.lang = langToUse;
    document.documentElement.dir = langToUse === 'ar' ? 'rtl' : 'ltr';
  }

  async switchLanguage(): Promise<void> {
    const newLang: Lang = this.currentLang === 'en' ? 'ar' : 'en';
    await this.setLanguage(newLang);
  }

  async setLanguage(lang: Lang): Promise<void> {
    await firstValueFrom(this.translate.use(lang));

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    localStorage.setItem(this.key, lang);
  }

  get currentLang(): Lang {
    return (this.translate.getCurrentLang() as Lang) || 'ar';
  }

  private getSavedLanguage(): Lang | null {
    const value = localStorage.getItem(this.key);
    return value === 'ar' || value === 'en' ? value : null;
  }
}
