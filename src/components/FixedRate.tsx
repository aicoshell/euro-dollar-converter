type Props = {
  active: boolean
  value: string
  onToggle: (b: boolean) => void
  onChange: (v: string) => void
  message?: string
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
      {message && <div className="msg error" role="status">{message}</div>}
      {active && showInvalidHint && <div className="msg">Saisissez un taux valide {'>'} 0</div>}
    </div>
  )
}
