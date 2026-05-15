import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';

export interface CitizenDataModel {
  nationalId: string;
  fullNameAr: string;
  fullNameEn: string;
  bloodType: BloodTypeEnum;
  bloodTypeDisplayName: string;
}
