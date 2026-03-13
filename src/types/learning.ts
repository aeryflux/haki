export type LocalizedString = {
  fr: string
  en: string
}

export interface Question {
  id: string
  question: LocalizedString
  hint?: LocalizedString
  answer: string
  explanation: LocalizedString
}

export interface Lesson {
  id: string
  title: LocalizedString
  description: LocalizedString
  questions: Question[]
}

export interface TPTask {
  id: string
  instruction: LocalizedString
  expectedCommands: string[]  // Commands that complete this task
}

export interface TP {
  id: string
  title: LocalizedString
  description: LocalizedString
  tasks: TPTask[]
  initialFiles?: Record<string, string>  // Virtual filesystem
}

export interface Path {
  id: string
  name: LocalizedString
  description: LocalizedString
  icon: string
  color: string
  lessons: Lesson[]
  tp?: TP  // Optional practical exercise at the end
  requiredPaths?: string[]
}

export interface Progress {
  pathId: string
  lessonId: string
  questionIndex: number
  completed: boolean
}
