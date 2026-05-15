import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { UrgencyLevel } from '../../domain/enums/urgency-level.enum';

export interface DoctorReviewBloodRequestDto {
  isApproved: boolean;

  bloodType?: BloodTypeEnum | null;
  unitsNeeded?: number | null;
  urgencyLevel?: UrgencyLevel | null;

  clinicalNotes?: string | null;
  rejectionReason?: string | null;
}
