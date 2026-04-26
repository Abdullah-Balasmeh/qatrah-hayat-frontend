import { Component } from '@angular/core';
import { AddHospitalFormComponent } from "../../components/add-hospital-form/add-hospital-form.component";
import { AddHospitalPageHeaderComponent } from "../../components/add-hospital-page-header/add-hospital-page-header.component";

@Component({
  selector: 'app-add-hospital-page',
  imports: [AddHospitalFormComponent, AddHospitalPageHeaderComponent],
  templateUrl: './add-hospital-page.component.html',
  styleUrl: './add-hospital-page.component.css'
})
export class AddHospitalPageComponent {

}
