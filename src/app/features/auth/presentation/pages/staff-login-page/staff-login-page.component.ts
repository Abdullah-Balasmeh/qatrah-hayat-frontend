import { Component } from '@angular/core';
import { StaffLoginFormComponent } from "../../components/staff-login-form/staff-login-form.component";
import { AuthContainerHeadingComponent } from "../../components/auth-container-heading/auth-container-heading.component";
import { AuthContainerFooterComponent } from "../../components/auth-container-footer/auth-container-footer.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-staff-login-page',
  imports: [TranslateModule, StaffLoginFormComponent, AuthContainerHeadingComponent],
  templateUrl: './staff-login-page.component.html',
  styleUrl: './staff-login-page.component.css'
})
export class StaffLoginPage {

}
