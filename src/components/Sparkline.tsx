type Props = { data: number[]; width?: number; height?: number }

export default function Sparkline({ data, width = 160, height = 42 }: Props) {
  // Marge intérieure pour éviter de couper le trait aux bords
  const pad = 4
  // On normalise la série entre min et max pour projeter sur la hauteur
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  // Transforme chaque point en coordonnées x,y réparties uniformément
  const points = data.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / (data.length - 1 || 1)
    const y = pad + (height - pad * 2) * (1 - (v - min) / range)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} className="spark">
      <polyline points={points} className="spark-line" />
    </svg>
  )
}
