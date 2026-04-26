export interface BranchStatisticsResponseModel {
  totalBranches: number;
  activeBranches: number;
  inactiveBranches: number;
  lastUpdate: string | null;
}
