import { CompilationPhase } from '../../types/compiler'

interface CompilationVisualizerProps {
  phase: CompilationPhase | null
}

const PHASES: { id: CompilationPhase; label: string; desc: string }[] = [
  { id: 'preprocessing', label: 'Preprocessing', desc: 'Expanding macros' },
  { id: 'lexical', label: 'Lexical Analysis', desc: 'Tokenizing code' },
  { id: 'syntax', label: 'Syntax Analysis', desc: 'Building AST' },
  { id: 'semantic', label: 'Semantic Analysis', desc: 'Type checking' },
  { id: 'codegen', label: 'Code Generation', desc: 'Generating assembly' },
]

export default function CompilationVisualizer({ phase }: CompilationVisualizerProps) {
  const getPhaseState = (phaseId: CompilationPhase) => {
    if (!phase) return ''
    const currentIndex = PHASES.findIndex((p) => p.id === phase)
    const phaseIndex = PHASES.findIndex((p) => p.id === phaseId)
    if (phaseId === phase) return 'active'
    if (phaseIndex < currentIndex) return 'done'
    return ''
  }

  return (
    <div>
      <h2 className="text-primary" style={{ marginBottom: 'var(--space-6)' }}>
        Compilation
      </h2>

      <div className="phase-list">
        {PHASES.map((p, index) => {
          const state = getPhaseState(p.id)
          return (
            <div key={p.id} className={`phase ${state}`}>
              <div className="phase-header">
                <div className="phase-number">
                  {state === 'done' ? '✓' : index + 1}
                </div>
                <div>
                  <div className="phase-title">{p.label}</div>
                  <div className="phase-desc">{p.desc}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {!phase && (
        <p className="text-muted" style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
          Click Compile to start
        </p>
      )}
    </div>
  )
}
