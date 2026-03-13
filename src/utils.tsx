import { ReactNode } from 'react'

/**
 * Renders text with backtick-wrapped content as <code> elements
 * Example: "Use `git add` to stage" -> ["Use ", <code>git add</code>, " to stage"]
 */
export function renderWithCode(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    return part
  })
}
