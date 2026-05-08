import { BranchWorkingHourModel } from "./branch-working-hour.model";

export interface UpdateBranchModel {
  branchNameAr: string;
  branchNameEn: string;

  addressAr: string;
  addressEn: string;

  managerUserId: number;

  isActive: boolean;

  gpsLat: number;
  gpsLng: number;

  email?: string | null;
  phone?: string | null;
   workingHours: BranchWorkingHourModel[];
}
