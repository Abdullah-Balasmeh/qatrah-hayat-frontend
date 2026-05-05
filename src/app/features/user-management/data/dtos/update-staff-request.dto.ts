import { UserRole } from "../../../../core/enums/user-role.enum";


export interface UpdateStaffRequestDto {
  email: string;
  phoneNumber: string;
  staffRole: UserRole;
  branchId?: number | null;
  hospitalId?: number | null;
  isActive: boolean;
}
