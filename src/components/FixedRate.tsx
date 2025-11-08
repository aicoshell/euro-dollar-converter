type Props = {
  // Active/désactive le mode « taux fixe »
  active: boolean
  // Valeur textuelle saisie pour le taux fixe (permet de gérer la virgule)
  value: string
  // Toggle d'activation du taux fixe
  onToggle: (b: boolean) => void
  // Mise à jour de la valeur du taux fixe
  onChange: (v: string) => void
  // Message ponctuel (ex: désactivation automatique)
  message?: string
  // Indice d'aide lorsque la valeur est invalide
  showInvalidHint: boolean
}

export default function FixedRate({ active, value, onToggle, onChange, message, showInvalidHint }: Props) {
  return (
    <div className="field">
      <div className="label">Taux fixe</div>
      <div className="input-group">
        <span className="addon">EUR→USD</span>
        <input className="input" inputMode="decimal" value={value} onChange={(e)=>onChange(e.target.value)} placeholder="Ex: 1.08" disabled={!active} aria-label="Taux fixe"/>
        <label className="check"><input type="checkbox" checked={active} onChange={(e)=>onToggle(e.target.checked)} /> Activer</label>
      </div>
      {/* Affiche un message lorsqu'on force la désactivation (écart > 2%) */}
      {message && <div className="msg error" role="status">{message}</div>}
      {/* Indice pour guider la saisie lorsqu'un taux invalide est fourni */}
      {active && showInvalidHint && <div className="msg">Saisissez un taux valide {'>'} 0</div>}
    </div>
  )
}
