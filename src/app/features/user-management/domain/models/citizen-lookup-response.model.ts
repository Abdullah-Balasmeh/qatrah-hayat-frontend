import { BloodTypeEnum } from '../../../../core/enums/blood-type-enum';
import { GenderEnum } from '../../../../core/enums/gender-enum';

export interface CitizenLookupResponseModel {
  nationalId: string;
  fullNameAr: string;
  fullNameEn: string;
  dateOfBirth: string;
  bloodType: BloodTypeEnum;
  gender: GenderEnum;
  isUser: boolean;
  isStaff: boolean;
  userId: number | null;
}
