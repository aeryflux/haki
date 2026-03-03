import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock timers for async tests
vi.useFakeTimers()

// Reset stores between tests
beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  vi.useFakeTimers()
})
