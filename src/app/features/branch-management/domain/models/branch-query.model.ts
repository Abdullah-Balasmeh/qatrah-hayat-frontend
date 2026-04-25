export interface BranchQueryModel {
  searchTerm?: string | null;
  isActive?: boolean | null;
  pageNumber: number;
  pageSize: number;
}
