import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { ScreeningResultStatus } from '../../../domain/enums/screening-result-status.enum';
import { ScreeningResultModel } from '../../../domain/models/screening-result.model';

@Component({
  selector: 'app-screening-result-message',
  imports: [TranslateModule, AppPrimaryButtonComponent],
  templateUrl: './screening-result-message.component.html',
  styleUrl: './screening-result-message.component.css'
})
export class ScreeningResultMessageComponent {
  @Input() result: ScreeningResultModel | null = null;
  @Output() continueToDashboard = new EventEmitter<void>();

  readonly continueKey = 'Screening-Keys.ACTIONS.CONTINUE';
  readonly nextEligibleDateKey = 'Screening-Keys.RESULT.NEXT_ELIGIBLE_DATE';
  readonly deferralReasonKey = 'Screening-Keys.RESULT.DEFERRAL_REASON';

  get messageKey(): string {
    return this.result?.resultEligibilityStatus === ScreeningResultStatus.Ineligible
      ? 'Screening-Keys.RESULT.INELIGIBLE'
      : 'Screening-Keys.RESULT.DEFERRED';
  }

  onContinue(): void {
    this.continueToDashboard.emit();
  }
}
