import { CreateStaffFromRegistryRequestDto } from "../dtos/create-staff-from-registry-request.dto";
import { CreateStaffFromRegistryModel } from "../../domain/models/create-staff-from-registry.model";

export function mapCreateStaffFromRegistryModelToDto(
  model: CreateStaffFromRegistryModel
): CreateStaffFromRegistryRequestDto {
  return {
    nationalId: model.nationalId,
    email: model.email,
    phoneNumber: model.phoneNumber,
    password: model.password,
    confirmPassword: model.confirmPassword,
    maritalStatus: model.maritalStatus,
    staffRole: model.staffRole,
    branchId: model.branchId,
    hospitalId: model.hospitalId,
  };
}