import { Component } from '@angular/core';
import { EditHospitalPageHeaderComponent } from "../../components/edit-hospital-page-header/edit-hospital-page-header.component";
import { EditHospitalFormComponent } from "../../components/edit-hospital-form/edit-hospital-form.component";

@Component({
  selector: 'app-edit-hospital-page',
  imports: [EditHospitalPageHeaderComponent, EditHospitalFormComponent],
  templateUrl: './edit-hospital-page.component.html',
  styleUrl: './edit-hospital-page.component.css'
})
export class EditHospitalPageComponent {

}
