import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-citizen-details-page-header',
  imports: [TranslateModule , RouterLink],
  templateUrl: './citizen-details-page-header.component.html',
  styleUrl: './citizen-details-page-header.component.css'
})
export class CitizenDetailsPageHeaderComponent {

}
