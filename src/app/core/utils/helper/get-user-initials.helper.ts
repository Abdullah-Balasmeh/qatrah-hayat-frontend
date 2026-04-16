export function getUserInitials(fullName: string | null | undefined): string {
  if (!fullName) return '';

  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return '';

  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export function getUserInitialsTwoPart(fullName: string | null | undefined): string {
  if (!fullName) return '';

  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return '';

  return `${parts[0]} ${parts[parts.length - 1]}`;
}
