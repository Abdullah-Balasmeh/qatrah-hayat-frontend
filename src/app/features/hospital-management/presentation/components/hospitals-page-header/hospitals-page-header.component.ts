import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hospitals-page-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './hospitals-page-header.component.html',
  styleUrl: './hospitals-page-header.component.css'
})
export class HospitalsPageHeaderComponent {

}
