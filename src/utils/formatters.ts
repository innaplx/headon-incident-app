/** Human-readable label from SCREAMING_SNAKE enum values */
export function formatEnumLabel(value: string): string {
  return value.replace(/_/g, ' ');
}

export function formatIncidentDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCoordinate(value: number, decimals = 4): string {
  return value.toFixed(decimals);
}
