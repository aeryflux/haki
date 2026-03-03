import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div style={{ height: '100%' }}>
      <div className="editor-header">
        <span className="file-indicator" />
        main.c
      </div>
      <Editor
        height="calc(100% - 40px)"
        defaultLanguage="c"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-mono)",
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
