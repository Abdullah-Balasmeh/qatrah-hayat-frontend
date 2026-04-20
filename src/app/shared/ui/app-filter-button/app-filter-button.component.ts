import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
export interface DropdownOption<T = string> {
  value: T;
  label: string;
  icon?: string;
}
@Component({
  selector: 'app-filter-button',
  imports: [CommonModule , TranslateModule],
  templateUrl: './app-filter-button.component.html',
  styleUrl: './app-filter-button.component.css'
})
export class AppFilterButtonComponent<T = string>  {
  readonly options = input.required<DropdownOption<T>[]>();
  readonly selectedValue = input.required<T>();
  readonly placeholder = input<string>('Select option');
  readonly prefixIcon = input<string>('fa-solid fa-filter');
  readonly translateLabels = input<boolean>(false);

  readonly valueChanged = output<T>();

  readonly isOpen = signal(false);

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  get selectedOption(): DropdownOption<T> | undefined {
    return this.options().find(option => option.value === this.selectedValue());
  }

  toggleDropdown(): void {
    this.isOpen.update(value => !value);
  }

  selectOption(option: DropdownOption<T>): void {
    this.valueChanged.emit(option.value);
    this.isOpen.set(false);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);

    if (!clickedInside) {
      this.closeDropdown();
    }
  }
}
