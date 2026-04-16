import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthContainerHeadingComponent } from "../../components/auth-container-heading/auth-container-heading.component";
import { AuthContainerFooterComponent } from "../../components/auth-container-footer/auth-container-footer.component";
import { CitizenSignUpFormComponent } from "../../components/citizen-sign-up-form/citizen-sign-up-form.component";

@Component({
  selector: 'app-citizen-sign-up-page',
  imports: [TranslateModule, AuthContainerHeadingComponent, AuthContainerFooterComponent, CitizenSignUpFormComponent],
  templateUrl: './citizen-sign-up-page.component.html',
  styleUrl: './citizen-sign-up-page.component.css'
})
export class CitizenSignUpPage {

}
