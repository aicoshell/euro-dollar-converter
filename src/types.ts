export type Currency = 'EUR' | 'USD'

export type Conversion = {
  timestamp: number
  realRate: number
  enteredRate: number | null
  fromValue: number
  fromCurrency: Currency
  toValue: number
  toCurrency: Currency
}
