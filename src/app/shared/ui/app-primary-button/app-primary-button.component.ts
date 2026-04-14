import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './app-primary-button.component.html',
  styleUrl: './app-primary-button.component.css'
})
export class AppPrimaryButtonComponent {
  @Input() label: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    if (this.disabled || this.isLoading) {
      return;
    }

    this.buttonClick.emit();
  }
}
