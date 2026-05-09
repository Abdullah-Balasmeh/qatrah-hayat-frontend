import { FormControl } from '@angular/forms';

import { UserRole } from '../../../../core/enums/user-role.enum';

export interface EditStaffFormModel {
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  staffRole: FormControl<UserRole | null>;
  branchId: FormControl<number | null>;
  hospitalId: FormControl<number | null>;
  isActive: FormControl<boolean>;
}
