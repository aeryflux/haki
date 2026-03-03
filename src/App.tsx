import { useState } from 'react'
import CodeEditor from './components/Editor/CodeEditor'
import CompilationVisualizer from './components/Visualizer/CompilationVisualizer'
import { useCompilerStore } from './stores/compiler'

const SAMPLE_CODE = `#include <stdio.h>

int main() {
    int x = 42;
    int y = 13;
    int sum = x + y;

    printf("Sum: %d\\n", sum);
    return 0;
}`

export default function App() {
  const [code, setCode] = useState(SAMPLE_CODE)
  const { compile, phase, isCompiling } = useCompilerStore()

  const handleCompile = () => {
    compile(code)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">Haki</span>
            <span className="text-slate-500 text-sm">Learn to Code</span>
          </div>
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isCompiling ? 'Compiling...' : 'Compile'}
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-2 gap-0">
        <div className="border-r border-slate-800">
          <CodeEditor value={code} onChange={setCode} />
        </div>
        <div className="bg-slate-900/50">
          <CompilationVisualizer phase={phase} />
        </div>
      </main>

      <footer className="border-t border-slate-800 px-6 py-2">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Phase: {phase || 'Ready'}</span>
          <span>C Language</span>
        </div>
      </footer>
    </div>
  )
}
