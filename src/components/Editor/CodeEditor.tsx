import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="h-full">
      <div className="h-10 border-b border-slate-800 flex items-center px-4 text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success/20 border border-success/50" />
          main.c
        </span>
      </div>
      <Editor
        height="calc(100vh - 140px)"
        defaultLanguage="c"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineHeight: 24,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          renderLineHighlight: 'line',
          cursorBlinking: 'smooth',
        }}
      />
    </div>
  )
}
