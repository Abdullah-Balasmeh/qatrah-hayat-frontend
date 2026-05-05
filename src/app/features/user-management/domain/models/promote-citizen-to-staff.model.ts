import { UserRole } from '../../../../core/enums/user-role.enum';

export interface PromoteCitizenToStaffModel {
  staffRole: UserRole;
  branchId: number | null;
  hospitalId: number | null;
}
