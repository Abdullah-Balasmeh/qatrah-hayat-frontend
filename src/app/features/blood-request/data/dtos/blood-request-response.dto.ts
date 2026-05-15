import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { RelationshipType } from '../../domain/enums/relationship-type.enum';
import { RequestStatus } from '../../domain/enums/request-status.enum';
import { UrgencyLevel } from '../../domain/enums/urgency-level.enum';

export interface BloodRequestResponseDto {
  id: number;

  relationshipType: RelationshipType;

  bloodType: BloodTypeEnum | null;
  bloodTypeDisplayName: string | null;

  unitsNeeded: number | null;

  unitsReserved: number;
  unitsAllocated: number;
  unitsRemaining: number;

  urgencyLevel: UrgencyLevel | null;
  requestStatus: RequestStatus;

  createdAt: string;
  doctorApprovedAt: string | null;
  publishedAt: string | null;
  updatedAt: string | null;

  beneficiaryId: number;
  beneficiaryNationalId: string;
  beneficiaryFullNameAr: string;
  beneficiaryFullNameEn: string;

  hospitalId: number;
  hospitalNameAr: string;
  hospitalNameEn: string;

  branchId: number;
  branchNameAr: string;
  branchNameEn: string;

  requesterUserId: number;
  requesterFullNameAr: string;
  requesterFullNameEn: string;

  doctorId: number;
  doctorFullNameAr: string;
  doctorFullNameEn: string;
}
