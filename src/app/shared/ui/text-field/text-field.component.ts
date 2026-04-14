import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: '../../../styles/text-field-style.css'
})
export class TextFieldComponent {
  @Input({ required: true }) control!: FormControl;

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = '';
  @Input() autocomplete: string = 'off';
  @Input() maxLength: string = '';
  @Input() readonly: boolean = false;
  @Input() inputId: string = '';
  @Input() isNumeric: boolean = false;
  @Input() value: string = '';
  isFocused = false;
  get hasSuffix(): boolean {
    return !!this.suffixIcon;
  }
  get isInvalid(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.control.markAsTouched();
  }

  onInput(event: Event): void {
    if (!this.isNumeric) return;

    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.control.setValue(input.value, { emitEvent: false });
  }
}
