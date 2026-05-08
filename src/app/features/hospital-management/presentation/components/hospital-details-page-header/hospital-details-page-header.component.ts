import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hospital-details-page-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './hospital-details-page-header.component.html',
  styleUrl: './hospital-details-page-header.component.css'
})
export class HospitalDetailsPageHeaderComponent {

}
