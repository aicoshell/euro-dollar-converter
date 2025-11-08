type Option = { value: string; label: string }

export function Segmented({ options, value, onChange, ariaLabel }: {
  options: Option[]
  value: string
  onChange: (v: string) => void
  ariaLabel?: string
}) {
  return (
    <div className="segmented" role="group" aria-label={ariaLabel}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={value === opt.value ? 'seg-btn active' : 'seg-btn'}
          onClick={() => value !== opt.value && onChange(opt.value)}
          aria-pressed={value === opt.value}
        >{opt.label}</button>
      ))}
    </div>
  )
}
