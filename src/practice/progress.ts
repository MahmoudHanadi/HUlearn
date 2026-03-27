import type { ActivityOutcome, PracticeActivity } from './types'

export const STORAGE_KEY = 'hulearn-progress-v2'
export const LEGACY_STORAGE_KEY = 'hulearn-progress-v1'
const BUCKET_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30]

export interface ActivityProgressEntry {
  lessonId: string
  activityId: string
  attempts: number
  bestScore: number
  lastScore: number
  lastCompletedAt: string
}

export interface ItemProgressEntry {
  itemId: string
  seenCount: number
  correctCount: number
  wrongCount: number
  streak: number
  bucket: number
  lastSeenAt: string
  nextDueAt: string
  lastActivityId: string
}

export interface ProgressState {
  version: 2
  activities: Record<string, ActivityProgressEntry>
  items: Record<string, ItemProgressEntry>
}

interface LegacyProgressEntry {
  attempts: number
  bestScore: number
  lastScore: number
  lastCompletedAt: string
  lessonId: string
  practiceId: string
}

type LegacyProgressState = Record<string, LegacyProgressEntry>

export function createEmptyProgressState(): ProgressState {
  return {
    version: 2,
    activities: {},
    items: {},
  }
}

function isProgressStateV2(value: unknown): value is ProgressState {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'version' in value &&
      (value as ProgressState).version === 2,
  )
}

function daysFromNow(days: number) {
  const now = new Date()
  now.setDate(now.getDate() + days)
  return now.toISOString()
}

function migrateLegacyProgress(legacyProgress: LegacyProgressState): ProgressState {
  const migratedProgress = createEmptyProgressState()

  for (const [activityId, entry] of Object.entries(legacyProgress)) {
    migratedProgress.activities[activityId] = {
      lessonId: entry.lessonId,
      activityId,
      attempts: entry.attempts,
      bestScore: entry.bestScore,
      lastScore: entry.lastScore,
      lastCompletedAt: entry.lastCompletedAt,
    }
  }

  return migratedProgress
}

export function readProgress(): ProgressState {
  const rawV2 = window.localStorage.getItem(STORAGE_KEY)

  if (rawV2) {
    try {
      const parsed = JSON.parse(rawV2) as unknown

      if (isProgressStateV2(parsed)) {
        return parsed
      }
    } catch {
      return createEmptyProgressState()
    }
  }

  const rawLegacy = window.localStorage.getItem(LEGACY_STORAGE_KEY)

  if (!rawLegacy) {
    return createEmptyProgressState()
  }

  try {
    const parsedLegacy = JSON.parse(rawLegacy) as LegacyProgressState
    return migrateLegacyProgress(parsedLegacy)
  } catch {
    return createEmptyProgressState()
  }
}

export function writeProgress(progress: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function getActivityProgress(progress: ProgressState, activityId: string) {
  return progress.activities[activityId] ?? null
}

export function getItemProgress(progress: ProgressState, itemId: string) {
  return progress.items[itemId] ?? null
}

export function isItemDue(progress: ProgressState, itemId: string) {
  const entry = getItemProgress(progress, itemId)

  if (!entry) {
    return true
  }

  return new Date(entry.nextDueAt).getTime() <= Date.now()
}

export function updateProgressAfterAttempt(
  progress: ProgressState,
  lessonId: string,
  activity: PracticeActivity,
  score: number,
  total: number,
  outcomes: ActivityOutcome[],
): ProgressState {
  const nextProgress: ProgressState = {
    version: 2,
    activities: { ...progress.activities },
    items: { ...progress.items },
  }
  const ratio = total === 0 ? 0 : score / total
  const existingActivityEntry = progress.activities[activity.id]

  nextProgress.activities[activity.id] = {
    lessonId,
    activityId: activity.id,
    attempts: existingActivityEntry ? existingActivityEntry.attempts + 1 : 1,
    bestScore: existingActivityEntry
      ? Math.max(existingActivityEntry.bestScore, ratio)
      : ratio,
    lastScore: ratio,
    lastCompletedAt: new Date().toISOString(),
  }

  for (const outcome of outcomes) {
    const existingItemEntry = progress.items[outcome.itemId]
    const previousBucket = existingItemEntry?.bucket ?? 0
    const nextBucket = outcome.correct
      ? Math.min(previousBucket + 1, BUCKET_INTERVAL_DAYS.length - 1)
      : 0

    nextProgress.items[outcome.itemId] = {
      itemId: outcome.itemId,
      seenCount: (existingItemEntry?.seenCount ?? 0) + 1,
      correctCount:
        (existingItemEntry?.correctCount ?? 0) + Number(outcome.correct),
      wrongCount:
        (existingItemEntry?.wrongCount ?? 0) + Number(!outcome.correct),
      streak: outcome.correct ? (existingItemEntry?.streak ?? 0) + 1 : 0,
      bucket: nextBucket,
      lastSeenAt: new Date().toISOString(),
      nextDueAt: daysFromNow(BUCKET_INTERVAL_DAYS[nextBucket]),
      lastActivityId: activity.id,
    }
  }

  return nextProgress
}

