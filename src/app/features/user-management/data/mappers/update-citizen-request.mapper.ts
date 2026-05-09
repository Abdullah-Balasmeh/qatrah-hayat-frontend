import { UpdateCitizenRequestDto } from "../dtos/update-citizen-request.dto";
import { UpdateCitizenModel } from "../../domain/models/update-citizen.model";

export function mapUpdateCitizenModelToDto(
  model: UpdateCitizenModel
): UpdateCitizenRequestDto {
  return {
    email: model.email,
    phoneNumber: model.phoneNumber,
    bloodTypeStatus: model.bloodTypeStatus,
    bloodType: model.bloodType,
    eligibilityStatus: model.eligibilityStatus,
    permanentDeferralReason: model.permanentDeferralReason ?? null,
    isActive: model.isActive,
  };
}
