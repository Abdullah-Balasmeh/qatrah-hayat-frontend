import { Component } from '@angular/core';

import { RelationshipType } from '../../../domain/enums/relationship-type.enum';
import { CreateBloodRequestFormComponent } from '../../components/create-blood-request-form/create-blood-request-form.component';

@Component({
  selector: 'app-create-other-blood-request-page',
  imports: [CreateBloodRequestFormComponent],
  templateUrl: './create-other-blood-request-page.component.html',
  styleUrl: './create-other-blood-request-page.component.css'
})
export class CreateOtherBloodRequestPageComponent {
  readonly relationshipType = RelationshipType.Other;
}
