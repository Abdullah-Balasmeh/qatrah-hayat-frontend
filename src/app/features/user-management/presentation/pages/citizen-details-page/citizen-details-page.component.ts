import { Component } from '@angular/core';
import { CitizenDetailsPageHeaderComponent } from "../../components/citizen-details-page-header/citizen-details-page-header.component";
import { CitizenDetailsCardComponent } from "../../components/citizen-details-card/citizen-details-card.component";

@Component({
  selector: 'app-citizen-details-page',
  imports: [CitizenDetailsPageHeaderComponent, CitizenDetailsCardComponent],
  templateUrl: './citizen-details-page.component.html',
  styleUrl: './citizen-details-page.component.css'
})
export class CitizenDetailsPageComponent {

}
