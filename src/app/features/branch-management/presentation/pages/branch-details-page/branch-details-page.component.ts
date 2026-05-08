import { Component } from '@angular/core';
import { BranchDetailsCardComponent } from "../../components/branch-details-card/branch-details-card.component";
import { BranchDetailsPageHeaderComponent } from "../../components/branch-details-page-header/branch-details-page-header.component";

@Component({
  selector: 'app-branch-details-page',
  imports: [BranchDetailsCardComponent, BranchDetailsPageHeaderComponent],
  templateUrl: './branch-details-page.component.html',
  styleUrl: './branch-details-page.component.css'
})
export class BranchDetailsPageComponent {

}
