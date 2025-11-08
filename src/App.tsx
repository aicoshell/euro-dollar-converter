import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { Segmented } from './components/Segmented'
import Sparkline from './components/Sparkline'
import InputGroup from './components/InputGroup'
import OutputTile from './components/OutputTile'
import FixedRate from './components/FixedRate'
import HistoryTable from './components/HistoryTable'
import { Currency, Conversion } from './types'

// Intervalle d'actualisation du « taux réel » simulé
const POLL_MS = 3000

export default function App() {
  // Taux « marché » simulé et son historique pour la sparkline
  const [realRate, setRealRate] = useState<number>(1.1)
  const [rateHistory, setRateHistory] = useState<number[]>([1.1])
  // Devise de saisie et valeur entrante (texte pour gérer la virgule)
  const [currency, setCurrency] = useState<Currency>('EUR')
  const [value, setValue] = useState<string>('')
  // Gestion du taux fixe (activation, valeur et message d’alerte écart)
  const [fixedOn, setFixedOn] = useState<boolean>(false)
  const [fixed, setFixed] = useState<string>('')
  const [fixedMsg, setFixedMsg] = useState<string>('')
  // Historique des conversions (limité à 5)
  const [history, setHistory] = useState<Conversion[]>([])

  const timer = useRef<number | null>(null)

  useEffect(() => {
    // Simule une dérive du taux pour refléter un environnement « live »
    timer.current = window.setInterval(() => {
      setRealRate(prev => Number(Math.max(0.0001, prev + (Math.random()*0.1 - 0.05)).toFixed(4)))
    }, POLL_MS)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [])

  // Alimente l’historique de taux pour le graphique (fenêtre glissante)
  useEffect(() => { setRateHistory(h => [...h, realRate].slice(-40)) }, [realRate])

  useEffect(() => {
    // Si l’utilisateur force un taux mais qu’il dérive trop du taux réel (>2%), on désactive
    if (!fixedOn) return
    const f = parseFloat(fixed)
    if (!Number.isFinite(f) || f <= 0) return
    const dev = Math.abs(f - realRate) / realRate
    if (dev > 0.02) {
      setFixedOn(false)
      setFixedMsg('Taux fixe désactivé (écart > 2% du taux réel).')
      const t = setTimeout(() => setFixedMsg(''), 4000)
      return () => clearTimeout(t)
    }
  }, [realRate, fixedOn, fixed])

  // Détermine le taux actif (fixe si valide, sinon réel)
  const activeRate = useMemo(() => {
    const f = parseFloat(fixed)
    return fixedOn && Number.isFinite(f) && f > 0 ? f : realRate
  }, [fixedOn, fixed, realRate])

  // Parsing tolérant (accepte virgule) puis calcul du résultat selon la devise
  const parsed = useMemo(() => parseFloat(String(value).replace(',', '.')), [value])
  const output = useMemo(() => !Number.isFinite(parsed) ? '' : currency === 'EUR' ? parsed * activeRate : parsed / activeRate, [parsed, currency, activeRate])

  // Inverse la devise: on propage la valeur de sortie précédente dans le champ de saisie
  const switchCurrency = (next: Currency) => {
    const prevOut = Number.isFinite(output as number) ? output as number : 0
    setCurrency(next)
    setValue(String(Number(prevOut.toFixed(2))))
  }

  // Enregistre une conversion dans l’historique (arrondi pour l’affichage)
  const convert = () => {
    if (!Number.isFinite(parsed)) return
    const from = currency
    const to: Currency = currency === 'EUR' ? 'USD' : 'EUR'
    const item: Conversion = {
      timestamp: Date.now(),
      realRate,
      enteredRate: fixedOn ? parseFloat(fixed) : null,
      fromValue: Number(parsed.toFixed(2)),
      fromCurrency: from,
      toValue: Number((output as number).toFixed(2)),
      toCurrency: to,
    }
    setHistory(h => [item, ...h].slice(0, 5))
  }

  return (
    <div className="shell">
      <header className="brand">
        <div className="title"><div className="logo-dot"/><h1>FX Converter</h1></div>
        <div className="pill" aria-live="polite">EUR→USD: <strong>{realRate.toFixed(4)}</strong></div>
      </header>

      <main className="layout">
        <section className="card controls">
          <div className="row">
            <div className="field">
              <div className="label">Devise de saisie</div>
              <Segmented options={[{value:'EUR',label:'EUR'},{value:'USD',label:'USD'}]} value={currency} onChange={(v)=>switchCurrency(v as Currency)} ariaLabel="Devise de saisie"/>
            </div>
            <div className="field"><div className="label">Taux actif</div><div className="rate-chip">{activeRate.toFixed(4)}</div></div>
          </div>

          <div className="row">
            <InputGroup label="Montant" addon={currency} value={value} onChange={setValue} placeholder="Saisir un montant" ariaLabel={`Montant en ${currency}`}/>
            <OutputTile value={output} currency={currency === 'EUR' ? 'USD' : 'EUR'} rate={activeRate} mode={currency === 'EUR' ? '×' : '÷'} />
          </div>

          <div className="row">
            <FixedRate active={!!fixedOn} value={fixed} onToggle={setFixedOn} onChange={setFixed} message={fixedMsg} showInvalidHint={fixedOn && (!Number.isFinite(parseFloat(fixed)) || parseFloat(fixed) <= 0)} />
            <div className="actions"><button className="btn" type="button" onClick={convert} disabled={!Number.isFinite(parsed)}>Convertir</button><div className="msg small">Actualisation auto toutes les 3s.</div></div>
          </div>
        </section>

        <section className="card insight">
          <div className="insight-head"><div className="insight-title">Tendance du taux</div><div className="insight-rate">{realRate.toFixed(4)}</div></div>
          <Sparkline data={rateHistory} />
        </section>
      </main>

      <HistoryTable items={history} />
    </div>
  )
}
