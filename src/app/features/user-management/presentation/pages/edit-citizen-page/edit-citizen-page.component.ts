import { Component } from '@angular/core';
import { EditCitizenFormComponent } from "../../components/edit-citizen-form/edit-citizen-form.component";
import { EditCitizenPageHeaderComponent } from "../../components/edit-citizen-page-header/edit-citizen-page-header.component";

@Component({
  selector: 'app-edit-citizen-page',
  imports: [EditCitizenFormComponent, EditCitizenPageHeaderComponent],
  templateUrl: './edit-citizen-page.component.html',
  styleUrl: './edit-citizen-page.component.css'
})
export class EditCitizenPageComponent {

}
