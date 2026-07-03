/** Format a number as Argentine pesos, no decimals. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Compact integer with thousands separators (es-AR). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-AR').format(value)
}
