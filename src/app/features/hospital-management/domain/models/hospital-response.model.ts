export interface HospitalResponseModel {
  id: number;

  hospitalNameAr: string;
  hospitalNameEn: string;

  addressAR: string;
  addressEn: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string | null;

  branchId: number;
  branchNameAr: string | null;
  branchNameEn: string | null;
}
