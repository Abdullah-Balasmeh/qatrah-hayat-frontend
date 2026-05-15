
import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { RequestStatus } from '../../domain/enums/request-status.enum';
import { UrgencyLevel } from '../../domain/enums/urgency-level.enum';

export interface BloodRequestQueryDto {
  searchTerm?: string | null;
  requestStatus?: RequestStatus | null;
  bloodType?: BloodTypeEnum | null;
  urgencyLevel?: UrgencyLevel | null;
  hospitalId?: number | null;
  branchId?: number | null;
  fromDate?: string | null;
  toDate?: string | null;
  pageNumber: number;
  pageSize: number;
}
