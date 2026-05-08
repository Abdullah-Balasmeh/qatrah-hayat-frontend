import { BranchWorkingHourDto } from "./branch-working-hour.dto";

export interface AddBranchRequestDto {
  branchNameAr: string;
  branchNameEn: string;

  addressAr: string;
  addressEn: string;

  managerUserId: number;

  gpsLat: number;
  gpsLng: number;

  email?: string | null;
  phone?: string | null;
   workingHours: BranchWorkingHourDto[];
}
