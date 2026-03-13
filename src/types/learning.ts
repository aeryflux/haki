export interface Question {
  id: string
  question: string
  hint?: string
  answer: string
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  questions: Question[]
}

export interface Path {
  id: string
  name: string
  description: string
  icon: string
  color: string
  lessons: Lesson[]
  requiredPaths?: string[]
}

export interface Progress {
  pathId: string
  lessonId: string
  questionIndex: number
  completed: boolean
}
