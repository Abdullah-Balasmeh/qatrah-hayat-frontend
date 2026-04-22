export enum BloodTypeStatus {
  Provisional = 1,
  Confirmed = 2
}

export const BLOOD_TYPE_STATUS_OPTIONS = [
  { value: BloodTypeStatus.Provisional, label: 'Blood-Type-Status-Keys.PROVISIONAL' },
  { value: BloodTypeStatus.Confirmed, label: 'Blood-Type-Status-Keys.CONFIRMED' }
];
