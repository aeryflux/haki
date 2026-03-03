export type CompilationPhase =
  | 'preprocessing'
  | 'lexical'
  | 'syntax'
  | 'semantic'
  | 'codegen'

export interface Token {
  type: string
  value: string
  line: number
  column: number
}

export interface ASTNode {
  type: string
  children?: ASTNode[]
  value?: string
  line?: number
}

export interface CompilationResult {
  success: boolean
  tokens?: Token[]
  ast?: ASTNode
  assembly?: string
  errors?: CompilationError[]
}

export interface CompilationError {
  message: string
  line: number
  column: number
  severity: 'error' | 'warning'
}
