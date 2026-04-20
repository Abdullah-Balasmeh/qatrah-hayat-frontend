import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() autocomplete: string = 'off';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() searchValue: string = '';

  @Output() searchValueChange = new EventEmitter<string>();
  @Output() searchSubmitted = new EventEmitter<void>();

  isFocused = false;

  get hasValue(): boolean {
    return !!this.searchValue?.trim();
  }

  onSearchValueChange(value: string): void {
    this.searchValue = value;
    this.searchValueChange.emit(value);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onEnter(): void {
    this.searchSubmitted.emit();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchValueChange.emit('');
    this.searchSubmitted.emit();
  }
}
