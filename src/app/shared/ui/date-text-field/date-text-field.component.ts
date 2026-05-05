import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-text-field',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './date-text-field.component.html',
  styleUrls: [
    '../../../styles/text-field-style.css',
    './date-text-field.component.css'
  ]
})
export class DateTextFieldComponent {
  @Input({ required: true }) control!: FormControl;

  @Input() placeholder: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = 'fa-calendar-days';
  @Input() autocomplete: string = 'off';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() inputId: string = '';

  isFocused = false;
  isDateMode = false;

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  get hasValue(): boolean {
    return !!this.control?.value;
  }

  get inputType(): string {
    return this.isDateMode || this.hasValue ? 'date' : 'text';
  }

  onFocus(input: HTMLInputElement): void {
    this.isFocused = true;
    this.isDateMode = true;

    setTimeout(() => {
      if ('showPicker' in input) {
        (input as HTMLInputElement & { showPicker(): void }).showPicker();
      }
    });
  }

  onBlur(): void {
    this.isFocused = false;
    this.control.markAsTouched();

    if (!this.control.value) {
      this.isDateMode = false;
    }
  }

  openDatePicker(input: HTMLInputElement): void {
    if (this.disabled || this.readonly) return;

    this.isDateMode = true;
    input.focus();

    setTimeout(() => {
      if ('showPicker' in input) {
        (input as HTMLInputElement & { showPicker(): void }).showPicker();
      }
    });
  }
}
