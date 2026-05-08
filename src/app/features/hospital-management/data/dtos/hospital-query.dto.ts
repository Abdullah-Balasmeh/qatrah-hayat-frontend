export interface HospitalQueryDto {
  searchTerm?: string | null;
  isActive?: boolean | null;
  branchId?: number | null;
  pageNumber: number;
  pageSize: number;
}
