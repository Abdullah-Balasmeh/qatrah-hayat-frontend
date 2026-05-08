import { Component } from '@angular/core';
import { EditBranchPageHeaderComponent } from "../../components/edit-branch-page-header/edit-branch-page-header.component";
import { EditBranchFormComponent } from "../../components/edit-branch-form/edit-branch-form.component";

@Component({
  selector: 'app-edit-branch-page',
  imports: [EditBranchPageHeaderComponent, EditBranchFormComponent],
  templateUrl: './edit-branch-page.component.html',
  styleUrl: './edit-branch-page.component.css'
})
export class EditBranchPageComponent {

}
