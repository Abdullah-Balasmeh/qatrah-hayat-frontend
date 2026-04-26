import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hospital-status-badge',
  imports: [CommonModule,TranslateModule],
  templateUrl: './hospital-status-badge.component.html',
  styleUrl: './hospital-status-badge.component.css'
})
export class HospitalStatusBadgeComponent {
 readonly isActive = input.required<boolean>();
}
