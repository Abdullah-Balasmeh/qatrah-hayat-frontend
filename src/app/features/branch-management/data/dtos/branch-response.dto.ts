import { BranchWorkingHourDto } from "./branch-working-hour.dto";

export interface BranchResponseDto {
  id: number;

  branchNameAr: string;
  branchNameEn: string;

  addressAr: string;
  addressEn: string;

  managerUserId: number;
  managerFullNameAr: string | null;
  managerFullNameEn: string | null;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;

  gpsLat: number;
  gpsLng: number;

  email: string | null;
  phone: string | null;

  updatedAt: string | null;

   workingHours: BranchWorkingHourDto[];
}
