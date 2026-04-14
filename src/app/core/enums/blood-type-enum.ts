export enum BloodTypeEnum {
  APositive = 1,
  ANegative = 2,
  BPositive = 3,
  BNegative = 4,
  ABPositive = 5,
  ABNegative = 6,
  OPositive = 7,
  ONegative = 8
}

export const BLOOD_TYPE_OPTIONS = [
  { value: BloodTypeEnum.APositive, label: 'A+' },
  { value: BloodTypeEnum.ANegative, label: 'A-' },
  { value: BloodTypeEnum.BPositive, label: 'B+' },
  { value: BloodTypeEnum.BNegative, label: 'B-' },
  { value: BloodTypeEnum.ABPositive, label: 'AB+' },
  { value: BloodTypeEnum.ABNegative, label: 'AB-' },
  { value: BloodTypeEnum.OPositive, label: 'O+' },
  { value: BloodTypeEnum.ONegative, label: 'O-' }
];
