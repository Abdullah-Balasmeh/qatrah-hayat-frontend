export enum UrgencyLevel {
  Normal = 1,
  Emergency = 2
}

export const URGENCY_LEVEL_OPTIONS = [
  {
    value: UrgencyLevel.Normal,
    label: 'Blood-Request-Urgency-Keys.NORMAL'
  },
  {
    value: UrgencyLevel.Emergency,
    label: 'Blood-Request-Urgency-Keys.EMERGENCY'
  }
];
