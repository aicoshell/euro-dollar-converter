type Props = {
  label: string
  addon?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  disabled?: boolean
  ariaLabel?: string
}

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
