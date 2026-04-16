export function formatDateForInput(isoDate: string): string {
  if (!isoDate) return '';
  return isoDate.split('T')[0];
}
