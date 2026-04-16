import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-marital-status-radio-group',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './marital-status-radio-group.component.html',
  styleUrl: './marital-status-radio-group.component.css'
})
export class MaritalStatusRadioGroupComponent {
  selectedValue: number | null = null;
  @Input() control!: AbstractControl;
  onSelectionChange(value: number): void {
    this.selectedValue = value;
    this.control.setValue(value);
  }
}
