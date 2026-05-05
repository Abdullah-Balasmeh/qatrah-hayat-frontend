import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ScreeningSessionType } from '../../../domain/enums/screening-session-type.enum';

@Component({
  selector: 'app-screening-intro-header',
  imports: [TranslateModule],
  templateUrl: './screening-intro-header.component.html',
  styleUrl: './screening-intro-header.component.css'
})
export class ScreeningIntroHeaderComponent implements AfterViewInit {
  @Input() sessionType: ScreeningSessionType | null = null;
  @Output() headerReady = new EventEmitter<void>();

  readonly titleKeys = {
    registration: 'Screening-Keys.TITLE.REGISTRATION',
    preDonation: 'Screening-Keys.TITLE.PRE_DONATION'
  };

  get titleKey(): string {
    return this.sessionType === ScreeningSessionType.PreDonation
      ? this.titleKeys.preDonation
      : this.titleKeys.registration;
  }

  ngAfterViewInit(): void {
    this.headerReady.emit();
  }
}
