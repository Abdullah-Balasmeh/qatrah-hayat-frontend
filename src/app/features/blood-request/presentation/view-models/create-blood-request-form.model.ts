import { FormControl } from '@angular/forms';
import { RelationshipType } from '../../domain/enums/relationship-type.enum';
import { UrgencyLevel } from '../../domain/enums/urgency-level.enum';
import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';

export interface CreateBloodRequestFormModel {
  relationshipType: FormControl<RelationshipType>;

  bloodType: FormControl<BloodTypeEnum | null>;

  unitsNeeded: FormControl<number | null>;

  urgencyLevel: FormControl<UrgencyLevel | null>;

  hospitalId: FormControl<number | null>;

  beneficiaryNationalId: FormControl<string>;

  beneficiaryFullNameAr: FormControl<string>;

  beneficiaryFullNameEn: FormControl<string>;
}
