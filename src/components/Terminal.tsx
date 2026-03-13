import { useState, useRef, useEffect } from 'react'
import { useI18n } from '../i18n'

interface TerminalProps {
  onCommand: (cmd: string) => { output: string; success: boolean }
  prompt?: string
  initialOutput?: string[]
}

export function Terminal({ onCommand, prompt = '~$', initialOutput = [] }: TerminalProps) {
  const { t } = useI18n()
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string; success?: boolean }[]>(
    initialOutput.map(text => ({ type: 'output', text, success: true }))
  )
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.trim()
    const result = onCommand(cmd)

    setHistory(prev => [
      ...prev,
      { type: 'input', text: `${prompt} ${cmd}` },
      { type: 'output', text: result.output, success: result.success }
    ])
    setInput('')
  }

  const focusInput = () => inputRef.current?.focus()

  return (
    <div className="terminal" onClick={focusInput}>
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">terminal</span>
      </div>
      <div className="terminal-body" ref={terminalRef}>
        {history.map((line, i) => (
          <div
            key={i}
            className={`terminal-line ${line.type} ${line.success === false ? 'error' : ''}`}
          >
            {line.text}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="terminal-input"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  )
}
