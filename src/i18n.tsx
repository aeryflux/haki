import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { LocalizedString } from './types/learning'

export type Locale = 'fr' | 'en'

const translations = {
  fr: {
    tagline: 'Apprends à coder, étape par étape',
    comingSoon: 'Bientôt disponible',
    showHint: "Voir l'indice",
    hideHint: "Cacher l'indice",
    yourAnswer: 'Ta réponse...',
    check: 'Vérifier',
    correct: '✓ Correct !',
    wrong: '✗ Pas tout à fait...',
    answer: 'Réponse',
    continue: 'Continuer →',
    back: '← Retour',
    paths: '← Parcours',
    questions: 'questions',
  },
  en: {
    tagline: 'Learn to code, step by step',
    comingSoon: 'Coming soon',
    showHint: 'Show hint',
    hideHint: 'Hide hint',
    yourAnswer: 'Your answer...',
    check: 'Check',
    correct: '✓ Correct!',
    wrong: '✗ Not quite...',
    answer: 'Answer',
    continue: 'Continue →',
    back: '← Back',
    paths: '← Paths',
    questions: 'questions',
  },
}

type TranslationKey = keyof typeof translations.fr

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  l: (localized: LocalizedString) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('haki-locale')
    if (saved === 'fr' || saved === 'en') return saved
    const browserLang = navigator.language.slice(0, 2)
    return browserLang === 'fr' ? 'fr' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('haki-locale', locale)
  }, [locale])

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key
  }

  const l = (localized: LocalizedString): string => {
    return localized[locale]
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, l }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}

export function LanguageSwitch() {
  const { locale, setLocale } = useI18n()

  return (
    <button
      className="lang-switch"
      onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
