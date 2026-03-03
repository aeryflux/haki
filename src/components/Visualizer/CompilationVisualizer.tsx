import { CompilationPhase } from '@/types/compiler'

interface CompilationVisualizerProps {
  phase: CompilationPhase | null
}

const PHASES: { id: CompilationPhase; label: string; description: string }[] = [
  {
    id: 'preprocessing',
    label: 'Preprocessing',
    description: 'Expanding macros and includes',
  },
  {
    id: 'lexical',
    label: 'Lexical Analysis',
    description: 'Breaking code into tokens',
  },
  {
    id: 'syntax',
    label: 'Syntax Analysis',
    description: 'Building the AST',
  },
  {
    id: 'semantic',
    label: 'Semantic Analysis',
    description: 'Type checking and validation',
  },
  {
    id: 'codegen',
    label: 'Code Generation',
    description: 'Generating assembly code',
  },
]

export default function CompilationVisualizer({ phase }: CompilationVisualizerProps) {
  return (
    <div className="h-full p-6">
      <h2 className="text-lg font-semibold text-slate-200 mb-6">
        Compilation Pipeline
      </h2>

      <div className="space-y-4">
        {PHASES.map((p, index) => {
          const isActive = p.id === phase
          const isPast = phase && PHASES.findIndex((x) => x.id === phase) > index

          return (
            <div
              key={p.id}
              className={`
                p-4 rounded-lg border transition-all
                ${isActive
                  ? 'border-primary bg-primary/10'
                  : isPast
                    ? 'border-success/50 bg-success/5'
                    : 'border-slate-700 bg-slate-800/50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${isActive
                      ? 'bg-primary text-white'
                      : isPast
                        ? 'bg-success text-white'
                        : 'bg-slate-700 text-slate-400'
                    }
                  `}
                >
                  {isPast ? '✓' : index + 1}
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      isActive ? 'text-primary' : isPast ? 'text-success' : 'text-slate-300'
                    }`}
                  >
                    {p.label}
                  </h3>
                  <p className="text-sm text-slate-500">{p.description}</p>
                </div>
              </div>

              {isActive && (
                <div className="mt-4 p-3 bg-slate-900/50 rounded font-mono text-sm text-slate-400">
                  <div className="animate-pulse">Processing...</div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!phase && (
        <div className="mt-8 text-center text-slate-500">
          <p>Click "Compile" to start the visualization</p>
        </div>
      )}
    </div>
  )
}
