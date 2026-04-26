import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-hospital-page-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './add-hospital-page-header.component.html',
  styleUrl: './add-hospital-page-header.component.css'
})
export class AddHospitalPageHeaderComponent {

}
