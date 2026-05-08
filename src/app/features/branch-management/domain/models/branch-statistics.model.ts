export interface BranchStatisticsModel {
  totalBranches: number;
  activeBranches: number;
  inactiveBranches: number;
  lastUpdate: string | null;
}
