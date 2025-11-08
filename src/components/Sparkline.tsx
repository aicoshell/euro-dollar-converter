type Props = { data: number[]; width?: number; height?: number }

export default function Sparkline({ data, width = 320, height = 96 }: Props) {
  // Marge intérieure pour éviter de couper le trait aux bords
  const pad = 8
  // On normalise la série entre min et max pour projeter sur la hauteur
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  // Transforme chaque point en coordonnées x,y réparties uniformément
  const coords = data.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / (data.length - 1 || 1)
    const y = pad + (height - pad * 2) * (1 - (v - min) / range)
    return { x, y }
  })
  const points = coords.map(p => `${p.x},${p.y}`).join(' ')

  // Construit une zone (path) sous la polyline pour un rendu plus riche
  const areaPath = coords.length > 1
    ? `M ${coords[0].x} ${height - pad} L ${coords.map(p => `${p.x} ${p.y}`).join(' L ')} L ${coords[coords.length - 1].x} ${height - pad} Z`
    : ''

  // Point terminal (dernier échantillon)
  const last = coords[coords.length - 1]

  const baselineY = height - pad

  // État vide: si moins de 2 points, affiche uniquement une ligne de base discrète
  const isEmpty = coords.length < 2

  // Ticks Y (min, 2 intermédiaires, max)
  const yTicks = 4
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => min + (range * i) / yTicks)
  const yTickYs = yTickVals.map(val => pad + (height - pad * 2) * (1 - (val - min) / (range || 1)))

  // Ticks X (4 repères équidistants)
  const xTicks = 4
  const xTickXs = Array.from({ length: xTicks + 1 }, (_, i) => pad + (i * (width - pad * 2)) / xTicks)

  return (
    <svg className="spark" width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,197,94,0.35)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0.00)" />
        </linearGradient>
      </defs>
      {/* Grille horizontale (Y) et labels */}
      {yTickYs.map((y, idx) => (
        <g key={`y-${idx}`}>
          <line x1={pad} y1={y} x2={width - pad} y2={y} className="spark-grid" />
          {/* Libellé à gauche */}
          <text x={pad + 4} y={y - 4} className="spark-label">{yTickVals[idx].toFixed(4)}</text>
        </g>
      ))}

      {/* Grille verticale (X) */}
      {xTickXs.map((x, idx) => (
        <line key={`x-${idx}`} x1={x} y1={pad} x2={x} y2={height - pad} className="spark-grid v" />
      ))}

      {/* Ligne de base en bas pour l’ancrage visuel */}
      <line x1={pad} y1={baselineY} x2={width - pad} y2={baselineY} className="spark-baseline" />

      {!isEmpty && areaPath && (
        <path d={areaPath} className="spark-fill" />
      )}
      {!isEmpty && (
        <polyline points={points} className="spark-line" />
      )}
      {!isEmpty && last && (
        <circle cx={last.x} cy={last.y} r={2.8} className="spark-dot" />
      )}
    </svg>
  )
}
