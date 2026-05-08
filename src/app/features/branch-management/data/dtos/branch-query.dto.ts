export interface BranchQueryDto {
  searchTerm?: string | null;
  isActive?: boolean | null;
  pageNumber: number;
  pageSize: number;
}
