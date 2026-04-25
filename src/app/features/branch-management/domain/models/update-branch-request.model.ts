export interface UpdateBranchRequestModel {
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
}
