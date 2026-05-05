import { UserRole } from '../../../../core/enums/user-role.enum';

export interface PromoteCitizenToStaffRequestDto {
  staffRole: UserRole;
  branchId: number | null;
  hospitalId: number | null;
}
