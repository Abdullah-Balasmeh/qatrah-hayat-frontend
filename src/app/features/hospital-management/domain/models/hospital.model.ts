export interface HospitalModel {
  id: number;

  hospitalNameAr: string;
  hospitalNameEn: string;

  addressAr: string;
  addressEn: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string | null;

  branchId: number;
  branchNameAr: string | null;
  branchNameEn: string | null;
}
