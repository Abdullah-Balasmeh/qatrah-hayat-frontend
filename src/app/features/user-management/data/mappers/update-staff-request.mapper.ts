import { UpdateStaffRequestDto } from "../dtos/update-staff-request.dto";
import { UpdateStaffModel } from "../../domain/models/update-staff.model";

export function mapUpdateStaffModelToDto(
  model: UpdateStaffModel
): UpdateStaffRequestDto {
  return {
    email: model.email,
    phoneNumber: model.phoneNumber,
    staffRole: model.staffRole,
    branchId: model.branchId,
    hospitalId: model.hospitalId,
    isActive: model.isActive,
  };
}