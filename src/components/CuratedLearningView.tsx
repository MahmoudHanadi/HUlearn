import { topicLabels } from '../content/lessons'
import {
  formatPercent,
  getLessonProgress,
  type ProgressState,
} from '../lib/app-state'
import type { ResolvedLesson } from '../practice/types'

interface CuratedLearningViewProps {
  lessons: ResolvedLesson[]
  progress: ProgressState
  onOpenLesson: (lessonId: string) => void
  onOpenLibrary: () => void
}

function compareLessons(left: ResolvedLesson, right: ResolvedLesson) {
  return (left.sequence ?? Number.MAX_SAFE_INTEGER) - (right.sequence ?? Number.MAX_SAFE_INTEGER)
}

export function CuratedLearningView({
  lessons,
  progress,
  onOpenLesson,
  onOpenLibrary,
}: CuratedLearningViewProps) {
  const orderedLessons = [...lessons].sort(compareLessons)
  const totalPracticeSets = orderedLessons.reduce(
    (sum, lesson) => sum + lesson.activities.length,
    0,
  )
  const phaseNames = [...new Set(orderedLessons.map((lesson) => lesson.phase ?? 'Path'))]
  const nextLesson =
    orderedLessons.find((lesson) => getLessonProgress(progress, lesson).startedSets === 0) ??
    orderedLessons[0]
  const completedScores = orderedLessons
    .map((lesson) => getLessonProgress(progress, lesson).bestAverage)
    .filter((score): score is number => score !== null)
  const averageBestScore =
    completedScores.length > 0
      ? completedScores.reduce((sum, score) => sum + score, 0) / completedScores.length
      : null

  return (
    <>
      <section className="guide-hero surface reveal track-frame track-curated-learning">
        <p className="eyebrow">Curated Learning</p>
        <h1>Follow the guided 0 to A2 route.</h1>
        <p className="hero-text">
          This section turns the Reddit and Catch Budapest resource path into a
          sequenced study route: sound system first, then counting and money,
          calendar language, clock time, scripts, high-frequency verbs, daily
          transactions, and finally A2-style tasks.
        </p>
        <div className="hero-actions">
          <button
            className="button-primary"
            onClick={() => onOpenLesson(nextLesson.id)}
            type="button"
          >
            Start with step {nextLesson.sequence}
          </button>
          <button className="button-secondary" onClick={onOpenLibrary} type="button">
            Open full library
          </button>
        </div>
      </section>

      <section className="guide-grid">
        <article className="surface reveal">
          <div className="section-heading">
            <p className="mini-label">Path Rules</p>
            <h2>How to use this section</h2>
          </div>
          <ul className="info-list">
            <li>Complete the lessons in order instead of jumping between unrelated topics.</li>
            <li>Keep pronunciation, numbers, and high-frequency chunks active every week.</li>
            <li>Use the linked resources inside each lesson for deeper study, not as optional extras.</li>
          </ul>
        </article>

        <article className="surface reveal">
          <div className="section-heading">
            <p className="mini-label">Weekly Rhythm</p>
            <h2>Recommended study cadence</h2>
          </div>
          <ul className="info-list">
            <li>5 study days per week, roughly 60 to 75 minutes each day.</li>
            <li>Daily mix: Anki, read-aloud or listening, one lesson block, and one output task.</li>
            <li>Add one speaking session each week once the first script feels stable.</li>
          </ul>
        </article>
      </section>

      <section className="guide-metrics surface reveal">
        <div className="filter-panel-head">
          <div>
            <p className="mini-label">Path Scope</p>
            <h2>Starter curriculum</h2>
          </div>
        </div>

        <div className="library-stats">
          <article className="compact-stat">
            <span>{orderedLessons.length}</span>
            <p>sequenced lessons</p>
          </article>
          <article className="compact-stat">
            <span>{totalPracticeSets}</span>
            <p>practice sets</p>
          </article>
          <article className="compact-stat">
            <span>{phaseNames.length}</span>
            <p>{`phases / ${formatPercent(averageBestScore)} best`}</p>
          </article>
        </div>
      </section>

      <div className="phase-stack">
        {phaseNames.map((phaseName) => {
          const phaseLessons = orderedLessons.filter(
            (lesson) => (lesson.phase ?? 'Path') === phaseName,
          )

          return (
            <section className="surface reveal" key={phaseName}>
              <div className="filter-panel-head">
                <div>
                  <p className="mini-label">Phase</p>
                  <h2>{phaseName}</h2>
                </div>
                <span className="subtle-pill">{phaseLessons.length} lessons</span>
              </div>

              <div className="lesson-grid">
                {phaseLessons.map((lesson) => {
                  const lessonProgress = getLessonProgress(progress, lesson)

                  return (
                    <article
                      className="lesson-card path-card track-frame track-curated-learning"
                      key={lesson.id}
                    >
                      <div className="card-topline">
                        <span className="badge track-badge track-curated-learning">
                          Step {lesson.sequence}
                        </span>
                        <span className="subtle-text">{lesson.level}</span>
                      </div>

                      <div className="lesson-copy">
                        <h2>{lesson.title}</h2>
                        <p className="lesson-subtitle">{lesson.subtitle}</p>
                        <p className="lesson-summary">{lesson.summary}</p>
                      </div>

                      <div className="tag-row">
                        {lesson.topics.map((topic) => (
                          <span className="tag" key={`${lesson.id}-${topic}`}>
                            {topicLabels[topic]}
                          </span>
                        ))}
                      </div>

                      <div className="lesson-progress">
                        <div>
                          <p className="mini-label">Progress</p>
                          <strong>
                            {lessonProgress.startedSets}/{lessonProgress.totalSets} sets tried
                          </strong>
                        </div>
                        <div>
                          <p className="mini-label">Best average</p>
                          <strong>{formatPercent(lessonProgress.bestAverage)}</strong>
                        </div>
                      </div>

                      <div className="card-footer">
                        <p className="subtle-text">
                          Source: {lesson.sourceUnits.join(', ')}
                        </p>
                        <button
                          className="button-primary"
                          onClick={() => onOpenLesson(lesson.id)}
                          type="button"
                        >
                          Open lesson
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
