/** Format amounts in Ethiopian Birr for display across the site. */
export function formatBirr(amount: number, suffix = ""): string {
  const formatted = amount.toLocaleString("en-ET");
  return suffix ? `${formatted} Birr${suffix}` : `${formatted} Birr`;
}

export function formatStartingBirr(amount: number, suffix = ""): string {
  return `Starting from ${formatBirr(amount, suffix)}`;
}
