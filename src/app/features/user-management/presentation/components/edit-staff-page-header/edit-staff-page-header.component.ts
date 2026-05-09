import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-staff-page-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './edit-staff-page-header.component.html',
  styleUrl: './edit-staff-page-header.component.css'
})
export class EditStaffPageHeaderComponent {

}
