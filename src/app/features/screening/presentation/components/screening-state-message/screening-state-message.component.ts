import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AppPrimaryButtonComponent } from '../../../../../shared/ui/app-primary-button/app-primary-button.component';
import { LoadingComponent } from '../../../../../shared/ui/loading/loading.component';

export type ScreeningStateMessageType = 'loading' | 'error' | 'empty' | 'invalid';

@Component({
  selector: 'app-screening-state-message',
  imports: [TranslateModule, AppPrimaryButtonComponent, LoadingComponent],
  templateUrl: './screening-state-message.component.html',
  styleUrl: './screening-state-message.component.css'
})
export class ScreeningStateMessageComponent {
  @Input() state: ScreeningStateMessageType = 'empty';
  @Input() messageKey = 'Screening-Keys.EMPTY.NO_QUESTIONS';
  @Input() actionLabelKey: string | null = null;
  @Output() messageAction = new EventEmitter<void>();

  onAction(): void {
    this.messageAction.emit();
  }
}
