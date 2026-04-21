import { UserRole } from '../../../../core/enums/user-role.enum';

export interface PromoteCitizenToStaffRequestModel {
  staffRole: UserRole;
  branchId: number | null;
  hospitalId: number | null;
}
