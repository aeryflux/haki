import { create } from 'zustand'
import type { CompilationPhase, CompilationResult, Token, ASTNode } from '@/types/compiler'

interface CompilerState {
  phase: CompilationPhase | null
  isCompiling: boolean
  tokens: Token[]
  ast: ASTNode | null
  assembly: string | null
  errors: { message: string; line: number }[]

  compile: (code: string) => Promise<void>
  reset: () => void
}

const PHASE_DELAYS: Record<CompilationPhase, number> = {
  preprocessing: 500,
  lexical: 800,
  syntax: 1000,
  semantic: 600,
  codegen: 700,
}

export const useCompilerStore = create<CompilerState>((set, get) => ({
  phase: null,
  isCompiling: false,
  tokens: [],
  ast: null,
  assembly: null,
  errors: [],

  compile: async (code: string) => {
    set({ isCompiling: true, errors: [] })

    const phases: CompilationPhase[] = [
      'preprocessing',
      'lexical',
      'syntax',
      'semantic',
      'codegen',
    ]

    for (const phase of phases) {
      set({ phase })
      await new Promise((resolve) => setTimeout(resolve, PHASE_DELAYS[phase]))

      // Simulate phase output
      if (phase === 'lexical') {
        set({ tokens: mockTokenize(code) })
      } else if (phase === 'syntax') {
        set({ ast: mockParse(code) })
      } else if (phase === 'codegen') {
        set({ assembly: mockCodegen(code) })
      }
    }

    set({ isCompiling: false, phase: null })
  },

  reset: () => {
    set({
      phase: null,
      isCompiling: false,
      tokens: [],
      ast: null,
      assembly: null,
      errors: [],
    })
  },
}))

// Mock functions for demonstration
function mockTokenize(code: string): Token[] {
  const tokens: Token[] = []
  const keywords = ['int', 'return', 'if', 'else', 'while', 'for', 'void', 'char']
  const words = code.match(/\w+|\S/g) || []

  words.forEach((word, i) => {
    tokens.push({
      type: keywords.includes(word) ? 'KEYWORD' : /^\d+$/.test(word) ? 'NUMBER' : 'IDENTIFIER',
      value: word,
      line: 1,
      column: i * 2,
    })
  })

  return tokens.slice(0, 20)
}

function mockParse(_code: string): ASTNode {
  return {
    type: 'Program',
    children: [
      {
        type: 'FunctionDecl',
        value: 'main',
        children: [
          { type: 'ReturnType', value: 'int' },
          {
            type: 'Block',
            children: [
              { type: 'VarDecl', value: 'x', children: [{ type: 'IntLiteral', value: '42' }] },
              { type: 'VarDecl', value: 'y', children: [{ type: 'IntLiteral', value: '13' }] },
              { type: 'ReturnStmt', children: [{ type: 'IntLiteral', value: '0' }] },
            ],
          },
        ],
      },
    ],
  }
}

function mockCodegen(_code: string): string {
  return `    .section .text
    .globl main
main:
    pushq   %rbp
    movq    %rsp, %rbp
    movl    $42, -4(%rbp)
    movl    $13, -8(%rbp)
    movl    -4(%rbp), %eax
    addl    -8(%rbp), %eax
    movl    %eax, -12(%rbp)
    movl    $0, %eax
    popq    %rbp
    ret`
}
