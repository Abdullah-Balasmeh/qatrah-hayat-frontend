export interface BranchWorkingHourDto {
  id?: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}
