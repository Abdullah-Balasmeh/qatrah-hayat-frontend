import { Component } from '@angular/core';
import { StaffDetailsPageHeaderComponent } from "../../components/staff-details-page-header/staff-details-page-header.component";
import { StaffDetailsCardComponent } from "../../components/staff-details-card/staff-details-card.component";

@Component({
  selector: 'app-staff-details-page',
  imports: [StaffDetailsPageHeaderComponent, StaffDetailsCardComponent],
  templateUrl: './staff-details-page.component.html',
  styleUrl: './staff-details-page.component.css'
})
export class StaffDetailsPageComponent {

}
