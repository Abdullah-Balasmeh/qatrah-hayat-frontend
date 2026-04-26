export interface HospitalStatisticsResponseModel {
  totalHospitals: number;
  activeHospitals: number;
  inactiveHospitals: number;
  lastUpdate: string | null;
}
