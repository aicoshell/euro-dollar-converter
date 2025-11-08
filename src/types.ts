// Devise supportée par l’application
export type Currency = 'EUR' | 'USD'

// Enregistrement d'une conversion réalisée par l’utilisateur
export type Conversion = {
  // Horodatage (ms epoch) pour l’affichage dans l’historique
  timestamp: number
  // Taux de marché utilisé au moment de la conversion
  realRate: number
  // Taux saisi manuellement (si mode taux fixe), sinon null
  enteredRate: number | null
  // Montant initial et sa devise
  fromValue: number
  fromCurrency: Currency
  // Montant converti et sa devise
  toValue: number
  toCurrency: Currency
}
