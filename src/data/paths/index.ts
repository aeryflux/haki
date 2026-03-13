import { cliPath } from './cli'
import { gitPath } from './git'
import type { Path } from '../../types/learning'

export const paths: Path[] = [
  cliPath,
  gitPath,
]

export const getPath = (id: string): Path | undefined => {
  return paths.find(p => p.id === id)
}

export const isPathUnlocked = (pathId: string, completedPaths: string[]): boolean => {
  const path = getPath(pathId)
  if (!path) return false
  if (!path.requiredPaths || path.requiredPaths.length === 0) return true
  return path.requiredPaths.every(req => completedPaths.includes(req))
}
