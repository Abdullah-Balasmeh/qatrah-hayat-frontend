import { Component } from '@angular/core';
import { AddBranchPageHeaderComponent } from "../../components/add-branch-page-header/add-branch-page-header.component";
import { AddBranchFormComponent } from "../../components/add-branch-form/add-branch-form.component";

@Component({
  selector: 'app-add-branch-page',
  imports: [AddBranchPageHeaderComponent, AddBranchFormComponent],
  templateUrl: './add-branch-page.component.html',
  styleUrl: './add-branch-page.component.css'
})
export class AddBranchPageComponent {

}
