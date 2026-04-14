import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-box-input.component.html',
  styleUrl: './check-box-input.component.css'
})
export class CheckBoxInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() inputId: string = '';
  @Input() label: string = '';
  @Input() name: string = '';


}
