import { UserRole } from "../../../../core/enums/user-role.enum";


export interface UserManagementQueryModel {
  searchTerm?: string | null;
  role?: UserRole | null;
  isActive?: boolean | null;
  branchId?: number | null;
  hospitalId?: number | null;
  pageNumber: number;
  pageSize: number;
}
