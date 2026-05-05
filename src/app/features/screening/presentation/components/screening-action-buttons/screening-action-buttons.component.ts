import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';

@Component({
  selector: 'app-screening-action-buttons',
  imports: [TranslateModule, AppPrimaryButtonComponent],
  templateUrl: './screening-action-buttons.component.html',
  styleUrl: './screening-action-buttons.component.css'
})
export class ScreeningActionButtonsComponent {
  @Input() canSubmit = true;
  @Input() isSubmitting = false;
  @Input() showContinue = false;
  @Output() submitScreening = new EventEmitter<void>();
  @Output() continueToDashboard = new EventEmitter<void>();

  readonly submitKey = 'Screening-Keys.ACTIONS.SUBMIT';
  readonly continueKey = 'Screening-Keys.ACTIONS.CONTINUE';

  onSubmit(): void {
    this.submitScreening.emit();
  }

  onContinue(): void {
    this.continueToDashboard.emit();
  }
}
