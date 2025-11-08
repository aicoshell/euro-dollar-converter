import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

vi.useFakeTimers()

afterEach(() => {
  cleanup()
})
