import { MaritalStatusEnum } from '../../../../core/enums/marital-status-enum';
import { UserRole } from '../../../../core/enums/user-role.enum';

export interface CreateStaffFromRegistryRequestDto {
  nationalId: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  maritalStatus: MaritalStatusEnum;
  staffRole: UserRole;
  branchId: number | null;
  hospitalId: number | null;
}
