export enum EligibilityStatus {
  Eligible = 1,
  TempDeferred = 2,
  PermDeferred = 3
}

export const ELIGIBILITY_STATUS_OPTIONS = [
  { value: EligibilityStatus.Eligible, label: 'Eligibility-Status-Keys.ELIGIBLE' },
  { value: EligibilityStatus.TempDeferred, label: 'Eligibility-Status-Keys.TEMP_DEFERRED' },
  { value: EligibilityStatus.PermDeferred, label: 'Eligibility-Status-Keys.PERM_DEFERRED' }
];

