import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthContainerHeadingComponent } from "../../components/auth-container-heading/auth-container-heading.component";
import { AuthContainerFooterComponent } from "../../components/auth-container-footer/auth-container-footer.component";
import { CitizenLoginFormComponent } from "../../components/citizen-login-form/citizen-login-form.component";

@Component({
  selector: 'app-citizen-login-page',
  imports: [CommonModule, TranslateModule, AuthContainerHeadingComponent, AuthContainerFooterComponent, CitizenLoginFormComponent],
  templateUrl: './citizen-login-page.component.html',
  styleUrl: './citizen-login-page.component.css'
})
export class CitizenLoginPage {

}
