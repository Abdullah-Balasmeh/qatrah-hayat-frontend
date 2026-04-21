export enum EligibilityStatus {
  Eligible = 1,
  TempDeferred = 2,
  PermDeferred = 3
}

export const ELIGIBILITY_STATUS_LABELS: Record<EligibilityStatus, string> = {
  [EligibilityStatus.Eligible]: 'Eligible',
  [EligibilityStatus.TempDeferred]: 'Temporarily Deferred',
  [EligibilityStatus.PermDeferred]: 'Permanently Deferred'
};
