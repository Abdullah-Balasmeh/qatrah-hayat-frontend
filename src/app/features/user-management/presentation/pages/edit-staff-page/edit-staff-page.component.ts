import { Component } from '@angular/core';
import { EditStaffPageHeaderComponent } from "../../components/edit-staff-page-header/edit-staff-page-header.component";
import { EditStaffFormComponent } from "../../components/edit-staff-form/edit-staff-form.component";

@Component({
  selector: 'app-edit-staff-page',
  imports: [EditStaffPageHeaderComponent, EditStaffFormComponent],
  templateUrl: './edit-staff-page.component.html',
  styleUrl: './edit-staff-page.component.css'
})
export class EditStaffPageComponent {

}
