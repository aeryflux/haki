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

export interface Path {
  id: string
  name: LocalizedString
  description: LocalizedString
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
