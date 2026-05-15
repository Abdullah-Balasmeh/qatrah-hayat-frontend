import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';

export interface CitizenDataResponseDto {
  nationalId: string;
  fullNameAr: string;
  fullNameEn: string;
  bloodType: BloodTypeEnum;
  bloodTypeDisplayName: string;
}
