
import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { UnitStatus } from '../../domain/enums/unit-status.enum';

export interface AllocatedBloodUnitDto {
  id: number;
  unitCode: string;

  bloodType: BloodTypeEnum;
  bloodTypeDisplayName: string;

  unitStatus: UnitStatus;

  collectionDate: string;
  expiresAt: string;
  allocatedAt: string | null;
}
