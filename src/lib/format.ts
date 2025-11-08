export const formatAmount = (value: number | '' | null) => {
  if (value === '' || value === null || Number.isNaN(value)) return ''
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value as number)
}
