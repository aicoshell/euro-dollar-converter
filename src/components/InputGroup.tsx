type Props = {
  // Libellé affiché au-dessus du champ
  label: string
  // Petit badge indicatif à gauche (ex: EUR / USD)
  addon?: string
  // Valeur saisie (contrôlée par le parent)
  value: string
  // Callback de mise à jour (remonte la valeur brute saisie)
  onChange: (v: string) => void
  // Placeholder du champ
  placeholder?: string
  // Conseille un clavier numérique/mobile adapté
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  // Désactive le champ si nécessaire
  disabled?: boolean
  // Alternative accessible pour lecteurs d’écran
  ariaLabel?: string
}

// Groupe champ + addon, centralise les conventions d’accessibilité et de style
export default function InputGroup({ label, addon, value, onChange, placeholder, inputMode = 'decimal', disabled, ariaLabel }: Props) {
  return (
    <div className="field">
      <div className="label">{label}</div>
      <div className="input-group">
        {addon && <span className="addon">{addon}</span>}
        <input
          className="input"
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
        />
      </div>
    </div>
  )
}
