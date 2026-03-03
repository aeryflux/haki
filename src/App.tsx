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
    <div className="app">
      <header className="header">
        <span className="logo">Haki</span>
        <button
          onClick={handleCompile}
          disabled={isCompiling}
          className="btn btn-primary"
        >
          {isCompiling ? 'Compiling...' : 'Compile'}
        </button>
      </header>

      <main className="main">
        <div className="panel panel-left">
          <CodeEditor value={code} onChange={setCode} />
        </div>
        <div className="panel panel-right">
          <CompilationVisualizer phase={phase} />
        </div>
      </main>
    </div>
  )
}
