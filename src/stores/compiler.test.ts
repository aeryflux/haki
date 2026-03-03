import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCompilerStore } from './compiler'

describe('useCompilerStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCompilerStore.setState({
      phase: null,
      isCompiling: false,
      tokens: [],
      ast: null,
      assembly: null,
      errors: [],
    })
  })

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const state = useCompilerStore.getState()

      expect(state.phase).toBeNull()
      expect(state.isCompiling).toBe(false)
      expect(state.tokens).toEqual([])
      expect(state.ast).toBeNull()
      expect(state.assembly).toBeNull()
      expect(state.errors).toEqual([])
    })
  })

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      // Set some state
      useCompilerStore.setState({
        phase: 'lexical',
        isCompiling: true,
        tokens: [{ type: 'KEYWORD', value: 'int', line: 1, column: 0 }],
        ast: { type: 'Program', children: [] },
        assembly: 'mov eax, 0',
        errors: [{ message: 'error', line: 1 }],
      })

      // Reset
      useCompilerStore.getState().reset()

      // Verify reset
      const state = useCompilerStore.getState()
      expect(state.phase).toBeNull()
      expect(state.isCompiling).toBe(false)
      expect(state.tokens).toEqual([])
      expect(state.ast).toBeNull()
      expect(state.assembly).toBeNull()
      expect(state.errors).toEqual([])
    })
  })

  describe('compile', () => {
    it('should set isCompiling to true at start', async () => {
      const compilePromise = useCompilerStore.getState().compile('int x = 1;')

      // Check immediately after starting
      expect(useCompilerStore.getState().isCompiling).toBe(true)

      // Run all timers to completion
      await vi.runAllTimersAsync()
      await compilePromise
    })

    it('should progress through all phases', async () => {
      const phases: string[] = []

      // Subscribe to state changes
      const unsubscribe = useCompilerStore.subscribe((state) => {
        if (state.phase && !phases.includes(state.phase)) {
          phases.push(state.phase)
        }
      })

      const compilePromise = useCompilerStore.getState().compile('int x = 1;')
      await vi.runAllTimersAsync()
      await compilePromise

      unsubscribe()

      expect(phases).toEqual([
        'preprocessing',
        'lexical',
        'syntax',
        'semantic',
        'codegen',
      ])
    })

    it('should generate tokens after lexical phase', async () => {
      const compilePromise = useCompilerStore.getState().compile('int x = 42;')
      await vi.runAllTimersAsync()
      await compilePromise

      const tokens = useCompilerStore.getState().tokens
      expect(tokens.length).toBeGreaterThan(0)
      expect(tokens[0]).toHaveProperty('type')
      expect(tokens[0]).toHaveProperty('value')
    })

    it('should generate AST after syntax phase', async () => {
      const compilePromise = useCompilerStore.getState().compile('int main() {}')
      await vi.runAllTimersAsync()
      await compilePromise

      const ast = useCompilerStore.getState().ast
      expect(ast).not.toBeNull()
      expect(ast?.type).toBe('Program')
      expect(ast?.children).toBeDefined()
    })

    it('should generate assembly after codegen phase', async () => {
      const compilePromise = useCompilerStore.getState().compile('int main() { return 0; }')
      await vi.runAllTimersAsync()
      await compilePromise

      const assembly = useCompilerStore.getState().assembly
      expect(assembly).not.toBeNull()
      expect(assembly).toContain('.globl main')
      expect(assembly).toContain('ret')
    })

    it('should set isCompiling to false after completion', async () => {
      const compilePromise = useCompilerStore.getState().compile('int x = 1;')
      await vi.runAllTimersAsync()
      await compilePromise

      expect(useCompilerStore.getState().isCompiling).toBe(false)
      expect(useCompilerStore.getState().phase).toBeNull()
    })

    it('should clear errors at start of compilation', async () => {
      // Set an error
      useCompilerStore.setState({
        errors: [{ message: 'previous error', line: 1 }],
      })

      const compilePromise = useCompilerStore.getState().compile('int x = 1;')

      // Errors should be cleared immediately
      expect(useCompilerStore.getState().errors).toEqual([])

      await vi.runAllTimersAsync()
      await compilePromise
    })
  })

  describe('mockTokenize', () => {
    it('should identify keywords correctly', async () => {
      const compilePromise = useCompilerStore.getState().compile('int return void')
      await vi.runAllTimersAsync()
      await compilePromise

      const tokens = useCompilerStore.getState().tokens
      const keywords = tokens.filter(t => t.type === 'KEYWORD')
      expect(keywords.length).toBeGreaterThan(0)
    })

    it('should identify numbers correctly', async () => {
      const compilePromise = useCompilerStore.getState().compile('42 123 0')
      await vi.runAllTimersAsync()
      await compilePromise

      const tokens = useCompilerStore.getState().tokens
      const numbers = tokens.filter(t => t.type === 'NUMBER')
      expect(numbers.length).toBeGreaterThan(0)
    })

    it('should limit tokens to 20', async () => {
      const longCode = 'int a b c d e f g h i j k l m n o p q r s t u v w x y z'
      const compilePromise = useCompilerStore.getState().compile(longCode)
      await vi.runAllTimersAsync()
      await compilePromise

      const tokens = useCompilerStore.getState().tokens
      expect(tokens.length).toBeLessThanOrEqual(20)
    })
  })
})
