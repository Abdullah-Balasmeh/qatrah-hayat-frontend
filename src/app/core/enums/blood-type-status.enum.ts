export enum BloodTypeStatus {
  Provisional = 1,
  Confirmed = 2
}

export const BLOOD_TYPE_STATUS_LABELS: Record<BloodTypeStatus, string> = {
  [BloodTypeStatus.Provisional]: 'Provisional',
  [BloodTypeStatus.Confirmed]: 'Confirmed'
};
