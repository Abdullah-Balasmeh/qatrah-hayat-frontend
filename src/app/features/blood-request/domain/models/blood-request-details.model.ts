import { BloodRequestModel } from './blood-request.model';
import { AllocatedBloodUnitModel } from './allocated-blood-unit.model';

export interface BloodRequestDetailsModel extends BloodRequestModel {
  clinicalNotes: string | null;

  cancellationReason: string | null;
  cancelledAt: string | null;
  cancelledByUserId: number | null;

  rejectionReason: string | null;
  rejectedAt: string | null;
  rejectedByUserId: number | null;

  publishedByUserId: number | null;

  allocatedBloodUnits: AllocatedBloodUnitModel[];
}
