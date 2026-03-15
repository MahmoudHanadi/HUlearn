import type { Lesson, Track } from '../content/types'

export const STORAGE_KEY = 'hulearn-progress-v1'

export type Route =
  | { view: 'home' }
  | { view: 'curated' }
  | { view: 'about' }
  | { view: 'lesson'; lessonId: string }
  | { view: 'practice'; lessonId: string; practiceId: string }

export type ProgressState = Record<string, ProgressEntry>

export interface ProgressEntry {
  attempts: number
  bestScore: number
  lastScore: number
  lastCompletedAt: string
  lessonId: string
  practiceId: string
}

export function parseHash(hash: string): Route {
  const cleanHash = hash.replace(/^#\/?/, '')
  const parts = cleanHash.split('/').filter(Boolean)

  if (parts.length === 0) {
    return { view: 'home' }
  }

  if (parts[0] === 'about') {
    return { view: 'about' }
  }

  if (parts[0] === 'curated') {
    return { view: 'curated' }
  }

  if (parts[0] === 'lesson' && parts[1]) {
    return { view: 'lesson', lessonId: decodeURIComponent(parts[1]) }
  }

  if (parts[0] === 'practice' && parts[1] && parts[2]) {
    return {
      view: 'practice',
      lessonId: decodeURIComponent(parts[1]),
      practiceId: decodeURIComponent(parts[2]),
    }
  }

  return { view: 'home' }
}

export function navigateTo(route: Route) {
  if (route.view === 'home') {
    window.location.hash = '/'
    return
  }

  if (route.view === 'about') {
    window.location.hash = '/about'
    return
  }

  if (route.view === 'curated') {
    window.location.hash = '/curated'
    return
  }

  if (route.view === 'lesson') {
    window.location.hash = `/lesson/${encodeURIComponent(route.lessonId)}`
    return
  }

  window.location.hash =
    `/practice/${encodeURIComponent(route.lessonId)}/${encodeURIComponent(route.practiceId)}`
}

export function readProgress(): ProgressState {
  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw) as ProgressState
  } catch {
    return {}
  }
}

export function writeProgress(progress: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function formatPercent(value: number | null) {
  if (value === null) {
    return 'Not started'
  }

  return `${Math.round(value * 100)}%`
}

export function shuffle<T>(items: T[]) {
  const nextItems = [...items]

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const current = nextItems[index]
    nextItems[index] = nextItems[randomIndex]
    nextItems[randomIndex] = current
  }

  return nextItems
}

export function getTrackById(tracks: Track[], trackId: string) {
  return tracks.find((track) => track.id === trackId) ?? tracks[0]
}

export function getPracticeProgress(progress: ProgressState, practiceId: string) {
  return progress[practiceId] ?? null
}

export function getLessonProgress(progress: ProgressState, lesson: Lesson) {
  const entries = lesson.practiceSets
    .map((practiceSet) => progress[practiceSet.id])
    .filter((entry): entry is ProgressEntry => Boolean(entry))

  if (entries.length === 0) {
    return {
      startedSets: 0,
      totalSets: lesson.practiceSets.length,
      bestAverage: null,
    }
  }

  const bestAverage =
    entries.reduce((sum, entry) => sum + entry.bestScore, 0) / entries.length

  return {
    startedSets: entries.length,
    totalSets: lesson.practiceSets.length,
    bestAverage,
  }
}
