import { BloodTypeEnum, BLOOD_TYPE_OPTIONS } from "../../enums/blood-type-enum";


// Helper methods to get display labels
export function getBloodTypeLabel(value: BloodTypeEnum | null): string {
  if (value == null) return '';
  return BLOOD_TYPE_OPTIONS.find(x => x.value === value)?.label ?? '';
}
