export type BranchDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface BranchWorkingHourModel {
  id?: number;
  dayOfWeek: BranchDayOfWeek;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}
