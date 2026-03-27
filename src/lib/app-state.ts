import type { Track } from '../content/types'
import {
  getActivityProgress,
  readProgress as readPracticeProgress,
  type ProgressState,
  writeProgress as writePracticeProgress,
} from '../practice/progress'
import type { ResolvedLesson } from '../practice/types'

export type Route =
  | { view: 'home' }
  | { view: 'curated' }
  | { view: 'about' }
  | { view: 'lesson'; lessonId: string }
  | { view: 'practice'; lessonId: string; practiceId: string }

export type { ActivityProgressEntry as ProgressEntry, ProgressState } from '../practice/progress'

const LEARNING_VISIBILITY_KEY = 'hulearn-learning-expanded'

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
  return readPracticeProgress()
}

export function writeProgress(progress: ProgressState) {
  writePracticeProgress(progress)
}

export function readLearningExpandedPreference() {
  const rawValue = window.localStorage.getItem(LEARNING_VISIBILITY_KEY)

  if (rawValue === null) {
    return true
  }

  return rawValue === 'true'
}

export function writeLearningExpandedPreference(isExpanded: boolean) {
  window.localStorage.setItem(LEARNING_VISIBILITY_KEY, String(isExpanded))
}

export function formatPercent(value: number | null) {
  if (value === null) {
    return 'Not started'
  }

  return `${Math.round(value * 100)}%`
}

export function getTrackById(tracks: Track[], trackId: string) {
  return tracks.find((track) => track.id === trackId) ?? tracks[0]
}

export function getPracticeProgress(progress: ProgressState, practiceId: string) {
  return getActivityProgress(progress, practiceId)
}

export function getLessonProgress(progress: ProgressState, lesson: ResolvedLesson) {
  const entries = lesson.activities
    .map((activity) => progress.activities[activity.id])
    .filter(Boolean)

  if (entries.length === 0) {
    return {
      startedSets: 0,
      totalSets: lesson.activities.length,
      bestAverage: null,
    }
  }

  const bestAverage =
    entries.reduce((sum, entry) => sum + entry.bestScore, 0) / entries.length

  return {
    startedSets: entries.length,
    totalSets: lesson.activities.length,
    bestAverage,
  }
}
