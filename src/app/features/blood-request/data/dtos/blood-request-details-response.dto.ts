import { BloodRequestResponseDto } from './blood-request-response.dto';
import { AllocatedBloodUnitDto } from './allocated-blood-unit.dto';

export interface BloodRequestDetailsResponseDto extends BloodRequestResponseDto {
  clinicalNotes: string | null;

  cancellationReason: string | null;
  cancelledAt: string | null;
  cancelledByUserId: number | null;

  rejectionReason: string | null;
  rejectedAt: string | null;
  rejectedByUserId: number | null;

  publishedByUserId: number | null;

  allocatedBloodUnits: AllocatedBloodUnitDto[];
}
