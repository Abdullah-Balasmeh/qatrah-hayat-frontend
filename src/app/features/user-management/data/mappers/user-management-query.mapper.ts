import { UserManagementQueryDto } from "../dtos/user-management-query.dto";
import { UserManagementQueryModel } from "../../domain/models/user-management-query.model";

export function mapUserManagementQueryModelToDto(
  model: UserManagementQueryModel
): UserManagementQueryDto {
  return {
    searchTerm: model.searchTerm?.trim() || null,
    role: model.role ?? null,
    isActive: model.isActive ?? null,
    branchId: model.branchId ?? null,
    hospitalId: model.hospitalId ?? null,
    pageNumber: model.pageNumber,
    pageSize: model.pageSize,
  };
}