import { BranchWorkingHourModel } from "./branch-working-hour.model";

export interface AddBranchModel {
  branchNameAr: string;
  branchNameEn: string;

  addressAr: string;
  addressEn: string;

  managerUserId: number;

  gpsLat: number;
  gpsLng: number;

  email?: string | null;
  phone?: string | null;
   workingHours: BranchWorkingHourModel[];
}
