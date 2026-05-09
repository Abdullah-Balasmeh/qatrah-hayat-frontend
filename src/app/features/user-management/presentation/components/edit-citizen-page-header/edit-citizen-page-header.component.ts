import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-citizen-page-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './edit-citizen-page-header.component.html',
  styleUrl: './edit-citizen-page-header.component.css'
})
export class EditCitizenPageHeaderComponent {

}
