import { Component, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { DropdownOption } from '../app-filter-button/app-filter-button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-drop-down-with-label',
  imports: [CommonModule , TranslateModule],
  templateUrl: './drop-down-with-label.component.html',
  styleUrl: './drop-down-with-label.component.css'
})
export class DropDownWithLabelComponent<T = string>{
 readonly options = input.required<DropdownOption<T>[]>();
  readonly selectedValue = input.required<T>();
  readonly placeholder = input<string>('Select option');
  readonly translateLabels = input<boolean>(false);
  readonly label = input<string>('');
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
