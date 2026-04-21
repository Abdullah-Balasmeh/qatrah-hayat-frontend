import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AddStaffPageHeaderComponent } from "../../components/add-staff-page-header/add-staff-page-header.component";
import { AddStaffFormComponent } from "../../components/add-staff-form/add-staff-form.component";

@Component({
  selector: 'app-add-staff-page',
  imports: [CommonModule,
    ReactiveFormsModule,
    AddStaffPageHeaderComponent, AddStaffFormComponent],
  templateUrl: './add-staff-page.component.html',
  styleUrl: './add-staff-page.component.css'
})
export class AddStaffPageComponent {


}
