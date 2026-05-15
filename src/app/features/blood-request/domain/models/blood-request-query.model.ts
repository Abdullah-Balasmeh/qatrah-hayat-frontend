import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { RequestStatus } from '../enums/request-status.enum';
import { UrgencyLevel } from '../enums/urgency-level.enum';

export interface BloodRequestQueryModel {
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
