import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-text-field',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-text-field.component.html',
  styleUrl: '../../../styles/text-field-style.css'
})
export class PasswordTextFieldComponent {
  @Input({ required: true }) control!: FormControl;

  @Input() placeholder: string = 'Password';
  @Input() prefixIcon: string = 'fas fa-lock';
  @Input() autocomplete: string = 'current-password';
  @Input() readonly: boolean = false;
  @Input() inputId: string = '';

  showPassword = false;
  isFocused = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get inputType(): string {
    return this.showPassword ? 'text' : 'password';
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
}
