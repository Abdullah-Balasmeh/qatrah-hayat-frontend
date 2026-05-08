import { Component } from '@angular/core';
import { HospitalDetailsPageHeaderComponent } from "../../components/hospital-details-page-header/hospital-details-page-header.component";
import { HospitalDetailsCardComponent } from "../../components/hospital-details-card/hospital-details-card.component";

@Component({
  selector: 'app-hospital-details-page',
  imports: [HospitalDetailsPageHeaderComponent, HospitalDetailsCardComponent],
  templateUrl: './hospital-details-page.component.html',
  styleUrl: './hospital-details-page.component.css'
})
export class HospitalDetailsPageComponent {

}
