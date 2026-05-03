import { LanguageService } from './../../../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
interface UrgentBloodNeed {
  hospitalNameAr: string;
  hospitalNameEn: string;
  locationAr: string;
  locationEn: string;
  postedTextAr: string;
  postedTextEn: string;
  bloodType: string;
}
@Component({
  selector: 'app-urgent-blood-needs',
  imports: [CommonModule, TranslateModule],
  templateUrl: './urgent-blood-needs.component.html',
  styleUrl: './urgent-blood-needs.component.css'
})
export class UrgentBloodNeedsComponent {
  private readonly language = inject(LanguageService);
  urgentNeeds: UrgentBloodNeed[] = [
    {
      hospitalNameAr: 'مستشفى المركز',
      hospitalNameEn: 'Central Hospital',
      locationAr: 'عمّان، الأردن',
      locationEn: 'Amman, Jordan',
      postedTextAr: 'نُشر قبل ساعتين',
      postedTextEn: 'Posted 2 hours ago',
      bloodType: '+O'
    },
    {
      hospitalNameAr: 'عيادة الأمل',
      hospitalNameEn: 'Al-Amal Clinic',
      locationAr: 'الزرقاء، الأردن',
      locationEn: 'Zarqa, Jordan',
      postedTextAr: 'نُشر قبل 5 ساعات',
      postedTextEn: 'Posted 5 hours ago',
      bloodType: '-AB'
    },
    {
      hospitalNameAr: 'المركز الطبي الجامعي',
      hospitalNameEn: 'University Medical Center',
      locationAr: 'إربد، الأردن',
      locationEn: 'Irbid, Jordan',
      postedTextAr: 'نُشر أمس',
      postedTextEn: 'Posted yesterday',
      bloodType: '-A'
    }
  ];

  onDonate(item: UrgentBloodNeed): void {
    console.log('Donate clicked for:', item);
  }

  onViewAll(): void {
    console.log('View all clicked');
  }

  trackByHospital(index: number, item: UrgentBloodNeed): string {
    return `${item.hospitalNameEn}-${item.bloodType}-${index}`;
  }
  get isArabic(): boolean {
    return this.language.currentLang === 'ar';
  }
}
