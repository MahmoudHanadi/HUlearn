import { topicLabels, tracks } from '../content/lessons'
import type { ExplanationTable } from '../content/types'
import {
  formatPercent,
  getLessonProgress,
  getPracticeProgress,
  getTrackById,
  type ProgressState,
} from '../lib/app-state'
import type { PracticeActivity, ResolvedLesson } from '../practice/types'
import { MetaBlock } from './atoms'

function ExplanationTableView({ table }: { table: ExplanationTable }) {
  return (
    <div className="lesson-table-block">
      {table.title ? <p className="mini-label lesson-table-title">{table.title}</p> : null}
      <div className="lesson-table-wrap">
        <table className={`lesson-table ${table.compact ? 'lesson-table-compact' : ''}`}>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, index) => (
              <tr key={`${table.title ?? 'table'}-${index}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${table.title ?? 'table'}-${index}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note ? <p className="subtle-text lesson-table-note">{table.note}</p> : null}
    </div>
  )
}

function getPracticeTypeLabel(practiceType: PracticeActivity['type']) {
  switch (practiceType) {
    case 'multiple-choice':
      return 'Multiple choice'
    case 'matching':
      return 'Match meaning'
    case 'flashcards':
      return 'Flashcards'
    case 'ordering':
      return 'Word order'
  }
}

interface LessonViewProps {
  lesson: ResolvedLesson
  progress: ProgressState
  backLabel: string
  isLearningExpanded: boolean
  onBack: () => void
  onLearningExpandedChange: (nextValue: boolean) => void
  onStartPractice: (practiceId: string) => void
}

export function LessonView({
  lesson,
  progress,
  backLabel,
  isLearningExpanded,
  onBack,
  onLearningExpandedChange,
  onStartPractice,
}: LessonViewProps) {
  const lessonProgress = getLessonProgress(progress, lesson)
  const track = getTrackById(tracks, lesson.trackId)
  const learningRegionId = `lesson-learning-${lesson.id}`
  const hasStudySupport =
    (lesson.studyFlow && lesson.studyFlow.length > 0) ||
    (lesson.resources && lesson.resources.length > 0)

  return (
    <>
      <section className={`lesson-hero surface reveal track-frame track-${lesson.trackId}`}>
        <div className="hero-actions">
          <button className="button-secondary" onClick={onBack} type="button">
            {backLabel}
          </button>
          <span className={`badge track-badge track-${track.id}`}>{track.name}</span>
        </div>

        <div className="lesson-hero-copy">
          <p className="eyebrow">{lesson.level} portal</p>
          <h1>{lesson.title}</h1>
          <p className="lesson-subtitle">{lesson.subtitle}</p>
          <p className="hero-text">{lesson.summary}</p>
        </div>

        <div className="portal-meta-grid">
          <MetaBlock label="Source" value={lesson.sourceUnits.join(', ')} />
          <MetaBlock
            label="Practice sets started"
            value={`${lessonProgress.startedSets}/${lessonProgress.totalSets}`}
          />
          <MetaBlock
            label="Best average"
            value={formatPercent(lessonProgress.bestAverage)}
          />
        </div>
      </section>

      <section className="surface reveal lesson-learning-toggle-panel">
        <div className="lesson-learning-toggle-row">
          <div className="section-heading section-heading-tight">
            <p className="mini-label">Learning</p>
            <h2>Study materials</h2>
          </div>
          <button
            aria-controls={learningRegionId}
            aria-expanded={isLearningExpanded}
            className="button-secondary learning-toggle-button"
            onClick={() => onLearningExpandedChange(!isLearningExpanded)}
            type="button"
          >
            {isLearningExpanded ? 'Hide learning' : 'Show learning'}
          </button>
        </div>
        <p className="subtle-text lesson-learning-summary">
          {isLearningExpanded
            ? 'Collapse the lesson notes when you want faster access to practice.'
            : 'Study notes, vocabulary, and examples are hidden until you expand this section.'}
        </p>
      </section>

      {isLearningExpanded ? (
        <div className="lesson-learning-content" id={learningRegionId}>
          <section className="surface reveal">
            <div className="section-heading">
              <p className="mini-label">Focus</p>
              <h2>What this lesson helps you do</h2>
            </div>
            <ul className="goal-list">
              {lesson.goals.map((goal) => (
                <li className="goal-item" key={goal}>
                  {goal}
                </li>
              ))}
            </ul>
          </section>

          {hasStudySupport ? (
            <>
              {lesson.studyFlow && lesson.studyFlow.length > 0 ? (
                <section className="surface reveal">
                  <div className="section-heading">
                    <p className="mini-label">Study Flow</p>
                    <h2>How to work this lesson</h2>
                  </div>
                  <ol className="info-list">
                    {lesson.studyFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {lesson.resources && lesson.resources.length > 0 ? (
                <section className="surface reveal">
                  <div className="section-heading">
                    <p className="mini-label">Resources</p>
                    <h2>Source-backed materials</h2>
                  </div>
                  <div className="note-grid">
                    {lesson.resources.map((resource) => (
                      <a
                        className="note-card resource-card"
                        href={resource.url}
                        key={resource.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <h3>{resource.title}</h3>
                        {resource.note ? <p>{resource.note}</p> : null}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : null}

          <section className="surface reveal">
            <div className="section-heading">
              <p className="mini-label">Grammar / Explanation</p>
              <h2>Study notes</h2>
            </div>
            <div className="note-grid">
              {lesson.explanations.map((explanation) => (
                <article className="note-card" key={explanation.title}>
                  <h3>{explanation.title}</h3>
                  <p>{explanation.body}</p>
                  {explanation.tables?.map((table, index) => (
                    <ExplanationTableView
                      key={`${explanation.title}-${table.title ?? index}`}
                      table={table}
                    />
                  ))}
                  {explanation.tips && explanation.tips.length > 0 ? (
                    <ul className="tip-list">
                      {explanation.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="surface reveal">
            <div className="section-heading">
              <p className="mini-label">Core vocabulary</p>
              <h2>Reference list</h2>
            </div>
            <div className="vocab-list">
              {lesson.vocabulary.map((item) => (
                <article className="vocab-item" key={item.hungarian}>
                  <div>
                    <h3>{item.hungarian}</h3>
                    <p>{item.english}</p>
                  </div>
                  {item.note ? <span className="subtle-text">{item.note}</span> : null}
                </article>
              ))}
            </div>
          </section>

          <section className="surface reveal">
            <div className="section-heading">
              <p className="mini-label">Examples</p>
              <h2>Sentence patterns</h2>
            </div>
            <div className="example-list">
              {lesson.examples.map((example) => (
                <article className="example-card" key={example.hungarian}>
                  <div>
                    <h3>{example.hungarian}</h3>
                    <p>{example.english}</p>
                  </div>
                  {example.focus ? (
                    <span className="example-focus">{example.focus}</span>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : null}

      <section className="surface reveal">
        <div className="section-heading">
          <p className="mini-label">Practice</p>
          <h2>Choose how you want to work</h2>
        </div>
        <div className="practice-grid">
          {lesson.activities.map((activity) => {
            const entry = getPracticeProgress(progress, activity.id)

            return (
              <article className="practice-card" key={activity.id}>
                <div className="card-topline">
                  <span className="badge badge-soft">
                    {getPracticeTypeLabel(activity.type)}
                  </span>
                  <span className="subtle-text">
                    {entry ? `${entry.attempts} attempts` : 'Fresh set'}
                  </span>
                </div>
                <h3>{activity.title}</h3>
                <p>{activity.instructions}</p>
                <div className="lesson-progress">
                  <div>
                    <p className="mini-label">Best</p>
                    <strong>{formatPercent(entry ? entry.bestScore : null)}</strong>
                  </div>
                  <div>
                    <p className="mini-label">Last</p>
                    <strong>{formatPercent(entry ? entry.lastScore : null)}</strong>
                  </div>
                </div>
                <div className="tag-row">
                  {lesson.topics.map((topic) => (
                    <span className="tag" key={`${activity.id}-${topic}`}>
                      {topicLabels[topic]}
                    </span>
                  ))}
                </div>
                <button
                  className="button-primary"
                  onClick={() => onStartPractice(activity.id)}
                  type="button"
                >
                  Start practice
                </button>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
