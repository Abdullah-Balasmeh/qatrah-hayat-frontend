import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.css'
})
export class AlertErrorComponent {
  @Input() errorMessage!: string;
}
