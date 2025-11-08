import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App', () => {
  it('affiche le titre et le bouton convertir', () => {
    render(<App />)
    expect(screen.getByText('FX Converter')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /convertir/i })).toBeInTheDocument()
  })

  it('affiche la pastille du taux EUR→USD', () => {
    render(<App />)
    expect(screen.getByText(/EUR→USD:/)).toBeInTheDocument()
  })
})
