import { useState, useEffect } from 'react'
import { paths, isPathUnlocked } from './data/paths'
import { I18nProvider, useI18n, LanguageSwitch } from './i18n'
import { renderWithCode } from './utils'
import { TPView } from './components/TPView'
import type { Path, Lesson, Question, TP } from './types/learning'

function PathCard({ path, isUnlocked, isCompleted, onSelect }: {
  path: Path
  isUnlocked: boolean
  isCompleted: boolean
  onSelect: () => void
}) {
  const { l } = useI18n()

  return (
    <button
      className={`path-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={onSelect}
      disabled={!isUnlocked}
      style={{ '--path-color': path.color } as React.CSSProperties}
    >
      <span className="path-icon">{path.icon}</span>
      <div className="path-info">
        <h3>{l(path.name)}</h3>
        <p>{l(path.description)}</p>
      </div>
      {!isUnlocked && <span className="lock-badge">🔒</span>}
      {isCompleted && <span className="complete-badge">✓</span>}
    </button>
  )
}

function QuestionView({ question, onAnswer }: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const { t, l } = useI18n()
  const [input, setInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isCorrect = input.trim().toLowerCase() === question.answer.toLowerCase()
    setResult(isCorrect ? 'correct' : 'wrong')
  }

  const handleNext = () => {
    onAnswer(result === 'correct')
    setInput('')
    setResult(null)
    setShowHint(false)
  }

  return (
    <div className="question-view">
      <div className="question-text">{renderWithCode(l(question.question))}</div>

      {question.hint && !result && (
        <button className="hint-btn" onClick={() => setShowHint(!showHint)}>
          {showHint ? t('hideHint') : t('showHint')}
        </button>
      )}

      {showHint && question.hint && (
        <div className="hint-text">💡 {l(question.hint)}</div>
      )}

      {!result ? (
        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t('yourAnswer')}
            autoFocus
            className="answer-input"
          />
          <button type="submit" className="btn btn-primary">
            {t('check')}
          </button>
        </form>
      ) : (
        <div className={`result ${result}`}>
          <div className="result-header">
            {result === 'correct' ? t('correct') : t('wrong')}
          </div>
          <div className="result-answer">
            {t('answer')} : <code>{question.answer}</code>
          </div>
          <div className="explanation">{renderWithCode(l(question.explanation))}</div>
          <button onClick={handleNext} className="btn btn-primary">
            {t('continue')}
          </button>
        </div>
      )}
    </div>
  )
}

function LessonView({ lesson, onComplete, onBack }: {
  lesson: Lesson
  onComplete: () => void
  onBack: () => void
}) {
  const { t, l } = useI18n()
  const [questionIndex, setQuestionIndex] = useState(0)
  const question = lesson.questions[questionIndex]
  const progress = ((questionIndex) / lesson.questions.length) * 100

  const handleAnswer = () => {
    if (questionIndex < lesson.questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="lesson-view">
      <header className="lesson-header">
        <button onClick={onBack} className="back-btn">{t('back')}</button>
        <div className="lesson-title">{l(lesson.title)}</div>
        <div className="lesson-progress">
          {questionIndex + 1} / {lesson.questions.length}
        </div>
      </header>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <main className="lesson-content">
        <QuestionView question={question} onAnswer={handleAnswer} />
      </main>
    </div>
  )
}

function PathView({ path, completedLessons, completedTPs, onSelectLesson, onSelectTP, onBack }: {
  path: Path
  completedLessons: string[]
  completedTPs: string[]
  onSelectLesson: (lesson: Lesson) => void
  onSelectTP: (tp: TP) => void
  onBack: () => void
}) {
  const { t, l } = useI18n()

  const allLessonsCompleted = path.lessons.every(l => completedLessons.includes(l.id))
  const tpCompleted = path.tp ? completedTPs.includes(path.tp.id) : false

  return (
    <div className="path-view">
      <header className="path-header">
        <button onClick={onBack} className="back-btn">{t('paths')}</button>
        <div className="path-title" style={{ color: path.color }}>
          <span className="path-icon">{path.icon}</span>
          {l(path.name)}
        </div>
      </header>

      <main className="lessons-list">
        {path.lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id)
          const prevCompleted = index === 0 || completedLessons.includes(path.lessons[index - 1].id)

          return (
            <button
              key={lesson.id}
              className={`lesson-card ${isCompleted ? 'completed' : ''} ${!prevCompleted ? 'locked' : ''}`}
              onClick={() => onSelectLesson(lesson)}
              disabled={!prevCompleted}
            >
              <span className="lesson-number">{index + 1}</span>
              <div className="lesson-info">
                <h4>{l(lesson.title)}</h4>
                <p>{l(lesson.description)}</p>
                <span className="question-count">{lesson.questions.length} {t('questions')}</span>
              </div>
              {isCompleted && <span className="check">✓</span>}
              {!prevCompleted && <span className="lock">🔒</span>}
            </button>
          )
        })}

        {path.tp && (
          <button
            className={`lesson-card tp-card ${tpCompleted ? 'completed' : ''} ${!allLessonsCompleted ? 'locked' : ''}`}
            onClick={() => onSelectTP(path.tp!)}
            disabled={!allLessonsCompleted}
          >
            <span className="lesson-number">TP</span>
            <div className="lesson-info">
              <h4>{l(path.tp.title)}</h4>
              <p>{l(path.tp.description)}</p>
              <span className="question-count">{path.tp.tasks.length} {t('tasks')}</span>
            </div>
            {tpCompleted && <span className="check">✓</span>}
            {!allLessonsCompleted && <span className="lock">🔒</span>}
          </button>
        )}
      </main>
    </div>
  )
}

function Home({ completedPaths, completedLessons, onSelectPath }: {
  completedPaths: string[]
  completedLessons: string[]
  onSelectPath: (path: Path) => void
}) {
  const { t } = useI18n()

  return (
    <div className="home">
      <LanguageSwitch />
      <header className="home-header">
        <h1 className="logo">Haki</h1>
        <p className="tagline">{t('tagline')}</p>
      </header>

      <main className="paths-grid">
        {paths.map(path => {
          const isUnlocked = isPathUnlocked(path.id, completedPaths)
          const pathLessonIds = path.lessons.map(l => l.id)
          const isCompleted = pathLessonIds.every(id => completedLessons.includes(id))

          return (
            <PathCard
              key={path.id}
              path={path}
              isUnlocked={isUnlocked}
              isCompleted={isCompleted}
              onSelect={() => onSelectPath(path)}
            />
          )
        })}

        {/* Coming soon placeholders */}
        <div className="path-card coming-soon">
          <span className="path-icon">🔧</span>
          <div className="path-info">
            <h3>C / C++</h3>
            <p>{t('comingSoon')}</p>
          </div>
        </div>
        <div className="path-card coming-soon">
          <span className="path-icon">🌐</span>
          <div className="path-info">
            <h3>HTML / CSS / JS</h3>
            <p>{t('comingSoon')}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function AppContent() {
  const [view, setView] = useState<'home' | 'path' | 'lesson' | 'tp'>('home')
  const [currentPath, setCurrentPath] = useState<Path | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentTP, setCurrentTP] = useState<TP | null>(null)
  const [completedPaths, setCompletedPaths] = useState<string[]>(() => {
    const saved = localStorage.getItem('haki-completed-paths')
    return saved ? JSON.parse(saved) : []
  })
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('haki-completed-lessons')
    return saved ? JSON.parse(saved) : []
  })
  const [completedTPs, setCompletedTPs] = useState<string[]>(() => {
    const saved = localStorage.getItem('haki-completed-tps')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('haki-completed-paths', JSON.stringify(completedPaths))
  }, [completedPaths])

  useEffect(() => {
    localStorage.setItem('haki-completed-lessons', JSON.stringify(completedLessons))
  }, [completedLessons])

  useEffect(() => {
    localStorage.setItem('haki-completed-tps', JSON.stringify(completedTPs))
  }, [completedTPs])

  const handleSelectPath = (path: Path) => {
    setCurrentPath(path)
    setView('path')
  }

  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    setView('lesson')
  }

  const handleSelectTP = (tp: TP) => {
    setCurrentTP(tp)
    setView('tp')
  }

  const handleLessonComplete = () => {
    if (currentLesson && currentPath) {
      if (!completedLessons.includes(currentLesson.id)) {
        const newCompletedLessons = [...completedLessons, currentLesson.id]
        setCompletedLessons(newCompletedLessons)

        // Check if path is complete (all lessons + TP if exists)
        const pathLessonIds = currentPath.lessons.map(l => l.id)
        const lessonsComplete = pathLessonIds.every(id => newCompletedLessons.includes(id))
        const tpComplete = !currentPath.tp || completedTPs.includes(currentPath.tp.id)
        if (lessonsComplete && tpComplete && !completedPaths.includes(currentPath.id)) {
          setCompletedPaths([...completedPaths, currentPath.id])
        }
      }
    }
    setView('path')
    setCurrentLesson(null)
  }

  const handleTPComplete = () => {
    if (currentTP && currentPath) {
      if (!completedTPs.includes(currentTP.id)) {
        const newCompletedTPs = [...completedTPs, currentTP.id]
        setCompletedTPs(newCompletedTPs)

        // Check if path is complete
        const pathLessonIds = currentPath.lessons.map(l => l.id)
        const lessonsComplete = pathLessonIds.every(id => completedLessons.includes(id))
        if (lessonsComplete && !completedPaths.includes(currentPath.id)) {
          setCompletedPaths([...completedPaths, currentPath.id])
        }
      }
    }
    setView('path')
    setCurrentTP(null)
  }

  return (
    <div className="app">
      {view === 'home' && (
        <Home
          completedPaths={completedPaths}
          completedLessons={completedLessons}
          onSelectPath={handleSelectPath}
        />
      )}
      {view === 'path' && currentPath && (
        <PathView
          path={currentPath}
          completedLessons={completedLessons}
          completedTPs={completedTPs}
          onSelectLesson={handleSelectLesson}
          onSelectTP={handleSelectTP}
          onBack={() => { setView('home'); setCurrentPath(null) }}
        />
      )}
      {view === 'lesson' && currentLesson && (
        <LessonView
          lesson={currentLesson}
          onComplete={handleLessonComplete}
          onBack={() => { setView('path'); setCurrentLesson(null) }}
        />
      )}
      {view === 'tp' && currentTP && (
        <TPView
          tp={currentTP}
          onComplete={handleTPComplete}
          onBack={() => { setView('path'); setCurrentTP(null) }}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}
