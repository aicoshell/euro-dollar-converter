import { Conversion } from '../types'

export default function HistoryTable({ items }: { items: Conversion[] }) {
  // Tableau d’historique compact
  // - Affiche jusqu’à 5 dernières conversions
  // - Use de la classe "mono" pour forcer l’alignement tabulaire
  return (
    <section className="card table-card">
      <div className="table-head"><h2>Historique</h2><span className="muted">5 dernières conversions</span></div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Date</th><th>Taux réel</th><th>Taux saisi</th><th>Valeur initiale</th><th>Valeur calculée</th></tr></thead>
          <tbody>
            {items.length === 0 ? (
              // État vide lisible quand aucune conversion n’a encore eu lieu
              <tr><td colSpan={5} className="empty">Aucune conversion pour le moment.</td></tr>
            ) : items.map(it => (
              <tr key={it.timestamp}>
                <td className="mono">{new Date(it.timestamp).toLocaleTimeString()}</td>
                <td className="mono">{it.realRate.toFixed(4)}</td>
                <td className="mono">{it.enteredRate ? it.enteredRate.toFixed(4) : '—'}</td>
                {/* Formatage localisé avec 2 décimales max pour la lisibilité */}
                <td className="mono">{new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(it.fromValue)} {it.fromCurrency}</td>
                <td className="mono">{new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(it.toValue)} {it.toCurrency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
