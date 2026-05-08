export interface BranchStatisticsResponseDto {
  totalBranches: number;
  activeBranches: number;
  inactiveBranches: number;
  lastUpdate: string | null;
}
