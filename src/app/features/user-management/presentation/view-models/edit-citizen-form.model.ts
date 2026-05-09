import { FormControl } from '@angular/forms';

import { BloodTypeStatus } from '../../../../core/enums/blood-type-status.enum';
import { EligibilityStatus } from '../../../../core/enums/eligibility-status.enum';
import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';

export interface EditCitizenFormModel {
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  bloodTypeStatus: FormControl<BloodTypeStatus | null>;
  bloodType: FormControl<BloodTypeEnum | null>;
  eligibilityStatus: FormControl<EligibilityStatus | null>;
  permanentDeferralReason: FormControl<string>;
  isActive: FormControl<boolean>;
}
