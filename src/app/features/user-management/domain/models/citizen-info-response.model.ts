import { BloodTypeStatus } from "../../../../core/enums/blood-type-status.enum";
import { EligibilityStatus } from "../../../../core/enums/eligibility-status.enum";
import { MaritalStatusEnum } from "../../../../core/enums/marital-status-enum";
import { BaseUserInfoModel } from "../../../../core/models/base-user-info.model";


export interface CitizenInfoResponseModel extends BaseUserInfoModel {
  maritalStatus: MaritalStatusEnum;
  jobTitle?: string | null;
  address?: string | null;
  bloodTypeStatus: BloodTypeStatus;
  eligibilityStatus: EligibilityStatus;
  donationCount: number;
  permanentDeferralReason?: string | null;
  lastDonationDate?: string | null;
  nextEligibleDate?: string | null;
  bloodTypeConfirmedAt?: string | null;
}
