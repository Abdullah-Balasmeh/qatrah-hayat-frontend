import { BloodTypeStatus } from "../../../../core/enums/blood-type-status.enum";
import { EligibilityStatus } from "../../../../core/enums/eligibility-status.enum";


export interface UpdateCitizenModel {
  email: string;
  phoneNumber: string;
  bloodTypeStatus: BloodTypeStatus;
  eligibilityStatus: EligibilityStatus;
  permanentDeferralReason?: string | null;
  isActive: boolean;
}
