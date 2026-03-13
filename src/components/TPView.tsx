import { useState } from 'react'
import { useI18n } from '../i18n'
import { Terminal } from './Terminal'
import { renderWithCode } from '../utils'
import type { TP } from '../types/learning'

interface TPViewProps {
  tp: TP
  onComplete: () => void
  onBack: () => void
}

// Simple virtual filesystem
interface VirtualFS {
  cwd: string
  files: Record<string, string>
  dirs: Set<string>
}

function createFS(initialFiles?: Record<string, string>): VirtualFS {
  const fs: VirtualFS = {
    cwd: '/home/user',
    files: { ...initialFiles },
    dirs: new Set(['/home/user', '/home', '/'])
  }
  // Add parent dirs for all files
  Object.keys(fs.files).forEach(path => {
    const parts = path.split('/')
    for (let i = 1; i < parts.length; i++) {
      fs.dirs.add(parts.slice(0, i).join('/') || '/')
    }
  })
  return fs
}

function executeCommand(cmd: string, fs: VirtualFS): { output: string; success: boolean; newFs: VirtualFS } {
  const parts = cmd.trim().split(/\s+/)
  const command = parts[0]
  const args = parts.slice(1)
  let newFs = { ...fs, files: { ...fs.files }, dirs: new Set(fs.dirs) }

  const resolvePath = (p: string): string => {
    if (p.startsWith('/')) return p
    if (p.startsWith('~')) return '/home/user' + p.slice(1)
    if (p === '..') {
      const parts = fs.cwd.split('/').filter(Boolean)
      parts.pop()
      return '/' + parts.join('/')
    }
    return fs.cwd + '/' + p
  }

  switch (command) {
    case 'pwd':
      return { output: fs.cwd, success: true, newFs }

    case 'ls': {
      const target = args[0] ? resolvePath(args[0]) : fs.cwd
      const items: string[] = []
      const targetPrefix = target === '/' ? '/' : target + '/'

      // Find direct children
      newFs.dirs.forEach(d => {
        if (d !== target && d.startsWith(targetPrefix)) {
          const rest = d.slice(targetPrefix.length)
          if (!rest.includes('/')) items.push(rest + '/')
        }
      })
      Object.keys(newFs.files).forEach(f => {
        if (f.startsWith(targetPrefix)) {
          const rest = f.slice(targetPrefix.length)
          if (!rest.includes('/')) items.push(rest)
        }
      })

      return { output: items.sort().join('  ') || '', success: true, newFs }
    }

    case 'cd': {
      if (!args[0] || args[0] === '~') {
        newFs.cwd = '/home/user'
        return { output: '', success: true, newFs }
      }
      const target = resolvePath(args[0])
      if (newFs.dirs.has(target)) {
        newFs.cwd = target
        return { output: '', success: true, newFs }
      }
      return { output: `cd: ${args[0]}: No such directory`, success: false, newFs: fs }
    }

    case 'mkdir': {
      if (!args[0]) return { output: 'mkdir: missing operand', success: false, newFs: fs }
      const target = resolvePath(args[0])
      newFs.dirs.add(target)
      return { output: '', success: true, newFs }
    }

    case 'touch': {
      if (!args[0]) return { output: 'touch: missing operand', success: false, newFs: fs }
      const target = resolvePath(args[0])
      if (!newFs.files[target]) newFs.files[target] = ''
      return { output: '', success: true, newFs }
    }

    case 'cat': {
      if (!args[0]) return { output: 'cat: missing operand', success: false, newFs: fs }
      const target = resolvePath(args[0])
      if (newFs.files[target] !== undefined) {
        return { output: newFs.files[target], success: true, newFs }
      }
      return { output: `cat: ${args[0]}: No such file`, success: false, newFs: fs }
    }

    case 'echo': {
      const text = args.join(' ').replace(/^["']|["']$/g, '')
      return { output: text, success: true, newFs }
    }

    case 'rm': {
      if (!args[0]) return { output: 'rm: missing operand', success: false, newFs: fs }
      const target = resolvePath(args[0])
      if (newFs.files[target] !== undefined) {
        delete newFs.files[target]
        return { output: '', success: true, newFs }
      }
      return { output: `rm: ${args[0]}: No such file`, success: false, newFs: fs }
    }

    case 'cp': {
      if (args.length < 2) return { output: 'cp: missing operand', success: false, newFs: fs }
      const src = resolvePath(args[0])
      const dest = resolvePath(args[1])
      if (newFs.files[src] !== undefined) {
        newFs.files[dest] = newFs.files[src]
        return { output: '', success: true, newFs }
      }
      return { output: `cp: ${args[0]}: No such file`, success: false, newFs: fs }
    }

    case 'mv': {
      if (args.length < 2) return { output: 'mv: missing operand', success: false, newFs: fs }
      const src = resolvePath(args[0])
      const dest = resolvePath(args[1])
      if (newFs.files[src] !== undefined) {
        newFs.files[dest] = newFs.files[src]
        delete newFs.files[src]
        return { output: '', success: true, newFs }
      }
      return { output: `mv: ${args[0]}: No such file`, success: false, newFs: fs }
    }

    default:
      return { output: `${command}: command not found`, success: false, newFs: fs }
  }
}

export function TPView({ tp, onComplete, onBack }: TPViewProps) {
  const { t, l } = useI18n()
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [fs, setFs] = useState(() => createFS(tp.initialFiles))
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const progress = (completedTasks.size / tp.tasks.length) * 100
  const allCompleted = completedTasks.size === tp.tasks.length

  const handleCommand = (cmd: string) => {
    const result = executeCommand(cmd, fs)
    setFs(result.newFs)
    setCommandHistory(prev => [...prev, cmd])

    // Check if any task is completed by this command
    tp.tasks.forEach(task => {
      if (!completedTasks.has(task.id)) {
        const isCompleted = task.expectedCommands.some(expected => {
          // Normalize and compare commands
          const normalizedCmd = cmd.trim().toLowerCase()
          const normalizedExpected = expected.trim().toLowerCase()
          return normalizedCmd === normalizedExpected ||
                 normalizedCmd.startsWith(normalizedExpected + ' ')
        })
        if (isCompleted) {
          setCompletedTasks(prev => new Set([...prev, task.id]))
        }
      }
    })

    return result
  }

  return (
    <div className="lesson-view">
      <header className="lesson-header">
        <button onClick={onBack} className="back-btn">{t('back')}</button>
        <div className="lesson-title">{l(tp.title)}</div>
        <div className="lesson-progress">
          {completedTasks.size} / {tp.tasks.length}
        </div>
      </header>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <main className="lesson-content">
        <div className="tp-view">
          <div className="tp-instructions">
            <p>{renderWithCode(l(tp.description))}</p>
          </div>

          <div className="tp-tasks">
            {tp.tasks.map((task, i) => (
              <div
                key={task.id}
                className={`tp-task ${completedTasks.has(task.id) ? 'completed' : ''}`}
              >
                <div className="tp-task-header">
                  <span className="tp-task-number">
                    {completedTasks.has(task.id) ? '✓' : i + 1}
                  </span>
                  <span className="tp-task-text">{renderWithCode(l(task.instruction))}</span>
                </div>
              </div>
            ))}
          </div>

          <Terminal onCommand={handleCommand} />

          {allCompleted && (
            <button onClick={onComplete} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              {t('continue')}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
