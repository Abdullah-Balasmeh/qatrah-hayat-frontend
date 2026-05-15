import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { UnitStatus } from '../enums/unit-status.enum';

export interface AllocatedBloodUnitModel {
  id: number;
  unitCode: string;

  bloodType: BloodTypeEnum;
  bloodTypeDisplayName: string;

  unitStatus: UnitStatus;

  collectionDate: string;
  expiresAt: string;
  allocatedAt: string | null;
}
