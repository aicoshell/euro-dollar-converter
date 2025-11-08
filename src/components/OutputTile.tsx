// Tuile d'affichage du résultat de conversion
type Props = { value: number | ''; currency: string; rate: number; mode: '×' | '÷' }

export default function OutputTile({ value, currency, rate, mode }: Props) {
  // Formatte le nombre pour l'affichage utilisateur (— si vide)
  const fmt = (v: number | '' ) => v === '' ? '—' : new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v as number)
  return (
    <div className="field">
      <div className="label">Résultat</div>
      <div className="output-tile" aria-live="polite">
        <div className="result-value">{fmt(value)}</div>
        <div className="result-sub">{currency} à {rate.toFixed(4)} ({mode})</div>
      </div>
    </div>
  )
}
