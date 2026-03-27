import { Fragment, useEffect, useState } from 'react'
import { formatPercent, getPracticeProgress, type ProgressState } from '../lib/app-state'
import { getPracticePlugin } from '../practice/registry'
import type { ActivityOutcome, PracticeActivity, ResolvedLesson } from '../practice/types'
import { MetaBlock } from './atoms'

function getPracticeCategoryLabel(activity: PracticeActivity) {
  switch (activity.category) {
    case 'review':
      return 'Adaptive review'
    case 'game':
      return 'Game'
    default:
      return 'Core practice'
  }
}

interface PracticeViewProps {
  lesson: ResolvedLesson
  activity: PracticeActivity
  progress: ProgressState
  onBack: () => void
  onComplete: (
    activityId: string,
    score: number,
    total: number,
    outcomes: ActivityOutcome[],
  ) => void
}

export function PracticeView({
  lesson,
  activity,
  progress,
  onBack,
  onComplete,
}: PracticeViewProps) {
  const [sessionKey, setSessionKey] = useState(0)
  const entry = getPracticeProgress(progress, activity.id)
  const plugin = getPracticePlugin(activity.type)

  useEffect(() => {
    setSessionKey(0)
  }, [activity.id])

  if (!plugin) {
    return (
      <section className="surface reveal">
        <div className="result-panel">
          <p className="eyebrow">Unsupported activity</p>
          <h2>This activity type is not registered yet.</h2>
          <p className="hero-text">
            The lesson resolved an activity, but the UI plugin for this type is missing.
          </p>
          <button className="button-primary" onClick={onBack} type="button">
            Back to lesson portal
          </button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className={`surface reveal track-frame track-${lesson.trackId}`}>
        <div className="hero-actions">
          <button className="button-secondary" onClick={onBack} type="button">
            Back to lesson portal
          </button>
          <span className={`badge track-badge track-${lesson.trackId}`}>
            {plugin.label}
          </span>
        </div>

        <div className="practice-header-copy">
          <p className="eyebrow">{lesson.title}</p>
          <h1>{activity.title}</h1>
          <p className="hero-text">{activity.instructions}</p>
        </div>

        <div className="portal-meta-grid">
          <MetaBlock
            label="Best score"
            value={formatPercent(entry ? entry.bestScore : null)}
          />
          <MetaBlock
            label="Last score"
            value={formatPercent(entry ? entry.lastScore : null)}
          />
          <MetaBlock
            label="Attempts"
            value={entry ? String(entry.attempts) : '0'}
          />
          <MetaBlock label="Mode" value={getPracticeCategoryLabel(activity)} />
        </div>
      </section>

      <Fragment key={`${activity.id}:${sessionKey}`}>
        {plugin.render({
          activity,
          lesson,
          progress,
          sessionKey,
          onComplete: (score, total, outcomes) =>
            onComplete(activity.id, score, total, outcomes),
          onRestart: () => setSessionKey((value) => value + 1),
        })}
      </Fragment>
    </>
  )
}
