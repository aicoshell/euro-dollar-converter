type Props = { data: number[]; width?: number; height?: number }

export default function Sparkline({ data, width = 160, height = 42 }: Props) {
  const pad = 4
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
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
