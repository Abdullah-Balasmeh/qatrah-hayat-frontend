import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormErrorMessageComponent } from '../../../../../shared/ui/form-error-message/form-error-message.component';
import { CheckBoxInputComponent } from "../../../../../shared/ui/check-box-input/check-box-input.component";

@Component({
  selector: 'app-screening-confirmation',
  imports: [ReactiveFormsModule, TranslateModule, FormErrorMessageComponent, CheckBoxInputComponent],
  templateUrl: './screening-confirmation.component.html',
  styleUrl: './screening-confirmation.component.css'
})
export class ScreeningConfirmationComponent {
  @Input({ required: true }) control!: FormControl<boolean>;
  @Input() showError = false;

  readonly labelKey = 'Screening-Keys.CONFIRMATION.ACCURACY';
  readonly errorKey = 'Screening-Keys.VALIDATION.CONFIRMATION_REQUIRED';
}
