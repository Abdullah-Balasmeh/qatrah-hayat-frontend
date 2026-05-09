import { BloodTypeEnum } from "../../../../core/enums/blood-type-enum";
import { BloodTypeStatus } from "../../../../core/enums/blood-type-status.enum";
import { EligibilityStatus } from "../../../../core/enums/eligibility-status.enum";


export interface UpdateCitizenModel {
  email: string;
  phoneNumber: string;
  bloodTypeStatus: BloodTypeStatus;
   bloodType: BloodTypeEnum;
  eligibilityStatus: EligibilityStatus;
  permanentDeferralReason?: string | null;
  isActive: boolean;
}
