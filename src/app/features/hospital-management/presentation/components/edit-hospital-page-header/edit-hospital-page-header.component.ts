import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-hospital-page-header',
  imports: [TranslateModule, RouterLink],
  templateUrl: './edit-hospital-page-header.component.html',
  styleUrl: './edit-hospital-page-header.component.css'
})
export class EditHospitalPageHeaderComponent {

}
