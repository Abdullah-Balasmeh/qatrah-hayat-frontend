import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-staff-page-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './add-staff-page-header.component.html',
  styleUrl: './add-staff-page-header.component.css'
})
export class AddStaffPageHeaderComponent {

}
