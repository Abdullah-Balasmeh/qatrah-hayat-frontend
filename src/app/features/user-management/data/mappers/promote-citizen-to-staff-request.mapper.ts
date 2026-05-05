import { PromoteCitizenToStaffRequestDto } from "../dtos/promote-citizen-to-staff-request.dto";
import { PromoteCitizenToStaffModel } from "../../domain/models/promote-citizen-to-staff.model";

export function mapPromoteCitizenToStaffModelToDto(
  model: PromoteCitizenToStaffModel
): PromoteCitizenToStaffRequestDto {
  return {
    staffRole: model.staffRole,
    branchId: model.branchId,
    hospitalId: model.hospitalId,
  };
}