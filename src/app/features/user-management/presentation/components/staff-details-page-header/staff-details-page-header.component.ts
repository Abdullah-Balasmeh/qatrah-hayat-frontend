import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-staff-details-page-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './staff-details-page-header.component.html',
  styleUrl: './staff-details-page-header.component.css'
})
export class StaffDetailsPageHeaderComponent {

}
