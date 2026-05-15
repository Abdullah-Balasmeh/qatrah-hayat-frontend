import { Component } from '@angular/core';

import { RelationshipType } from '../../../domain/enums/relationship-type.enum';
import { CreateBloodRequestFormComponent } from '../../components/create-blood-request-form/create-blood-request-form.component';

@Component({
  selector: 'app-create-self-blood-request-page',
  imports: [CreateBloodRequestFormComponent],
  templateUrl: './create-self-blood-request-page.component.html',
  styleUrl: './create-self-blood-request-page.component.css'
})
export class CreateSelfBloodRequestPageComponent {
  readonly relationshipType = RelationshipType.Self;
}
