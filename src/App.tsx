import { useState, useEffect } from 'react'
import { paths, getPath, isPathUnlocked } from './data/paths'
import type { Path, Lesson, Question } from './types/learning'

function PathCard({ path, isUnlocked, isCompleted, onSelect }: {
  path: Path
  isUnlocked: boolean
  isCompleted: boolean
  onSelect: () => void
}) {
  return (
    <button
      className={`path-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={onSelect}
      disabled={!isUnlocked}
      style={{ '--path-color': path.color } as React.CSSProperties}
    >
      <span className="path-icon">{path.icon}</span>
      <div className="path-info">
        <h3>{path.name}</h3>
        <p>{path.description}</p>
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
      <div className="question-text">{question.question}</div>

      {question.hint && !result && (
        <button className="hint-btn" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Cacher l\'indice' : 'Voir l\'indice'}
        </button>
      )}

      {showHint && question.hint && (
        <div className="hint-text">💡 {question.hint}</div>
      )}

      {!result ? (
        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ta réponse..."
            autoFocus
            className="answer-input"
          />
          <button type="submit" className="btn btn-primary">
            Vérifier
          </button>
        </form>
      ) : (
        <div className={`result ${result}`}>
          <div className="result-header">
            {result === 'correct' ? '✓ Correct !' : '✗ Pas tout à fait...'}
          </div>
          <div className="result-answer">
            Réponse : <code>{question.answer}</code>
          </div>
          <div className="explanation">{question.explanation}</div>
          <button onClick={handleNext} className="btn btn-primary">
            Continuer →
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
        <button onClick={onBack} className="back-btn">← Retour</button>
        <div className="lesson-title">{lesson.title}</div>
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

function PathView({ path, completedLessons, onSelectLesson, onBack }: {
  path: Path
  completedLessons: string[]
  onSelectLesson: (lesson: Lesson) => void
  onBack: () => void
}) {
  return (
    <div className="path-view">
      <header className="path-header">
        <button onClick={onBack} className="back-btn">← Parcours</button>
        <div className="path-title" style={{ color: path.color }}>
          <span className="path-icon">{path.icon}</span>
          {path.name}
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
                <h4>{lesson.title}</h4>
                <p>{lesson.description}</p>
                <span className="question-count">{lesson.questions.length} questions</span>
              </div>
              {isCompleted && <span className="check">✓</span>}
              {!prevCompleted && <span className="lock">🔒</span>}
            </button>
          )
        })}
      </main>
    </div>
  )
}

function Home({ completedPaths, completedLessons, onSelectPath }: {
  completedPaths: string[]
  completedLessons: string[]
  onSelectPath: (path: Path) => void
}) {
  return (
    <div className="home">
      <header className="home-header">
        <h1 className="logo">Haki</h1>
        <p className="tagline">Apprends à coder, étape par étape</p>
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
            <p>Bientôt disponible</p>
          </div>
        </div>
        <div className="path-card coming-soon">
          <span className="path-icon">🌐</span>
          <div className="path-info">
            <h3>HTML / CSS / JS</h3>
            <p>Bientôt disponible</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'home' | 'path' | 'lesson'>('home')
  const [currentPath, setCurrentPath] = useState<Path | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [completedPaths, setCompletedPaths] = useState<string[]>(() => {
    const saved = localStorage.getItem('haki-completed-paths')
    return saved ? JSON.parse(saved) : []
  })
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('haki-completed-lessons')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('haki-completed-paths', JSON.stringify(completedPaths))
  }, [completedPaths])

  useEffect(() => {
    localStorage.setItem('haki-completed-lessons', JSON.stringify(completedLessons))
  }, [completedLessons])

  const handleSelectPath = (path: Path) => {
    setCurrentPath(path)
    setView('path')
  }

  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    setView('lesson')
  }

  const handleLessonComplete = () => {
    if (currentLesson && currentPath) {
      if (!completedLessons.includes(currentLesson.id)) {
        const newCompletedLessons = [...completedLessons, currentLesson.id]
        setCompletedLessons(newCompletedLessons)

        // Check if path is complete
        const pathLessonIds = currentPath.lessons.map(l => l.id)
        const pathComplete = pathLessonIds.every(id => newCompletedLessons.includes(id))
        if (pathComplete && !completedPaths.includes(currentPath.id)) {
          setCompletedPaths([...completedPaths, currentPath.id])
        }
      }
    }
    setView('path')
    setCurrentLesson(null)
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
          onSelectLesson={handleSelectLesson}
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
    </div>
  )
}
