export interface HospitalStatisticsResponseDto {
  totalHospitals: number;
  activeHospitals: number;
  inactiveHospitals: number;
  lastUpdate: string | null;
}
