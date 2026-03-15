import { topicLabels, tracks } from '../content/lessons'
import type { Lesson } from '../content/types'
import {
  formatPercent,
  getLessonProgress,
  getPracticeProgress,
  getTrackById,
  type ProgressState,
} from '../lib/app-state'
import { MetaBlock } from './atoms'

function getPracticeTypeLabel(practiceType: Lesson['practiceSets'][number]['type']) {
  switch (practiceType) {
    case 'fill':
      return 'Fill the blank'
    case 'match':
      return 'Match meaning'
    case 'flashcards':
      return 'Flashcards'
  }
}

interface LessonViewProps {
  lesson: Lesson
  progress: ProgressState
  backLabel: string
  onBack: () => void
  onStartPractice: (practiceId: string) => void
}

export function LessonView({
  lesson,
  progress,
  backLabel,
  onBack,
  onStartPractice,
}: LessonViewProps) {
  const lessonProgress = getLessonProgress(progress, lesson)
  const track = getTrackById(tracks, lesson.trackId)

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

      {(lesson.studyFlow && lesson.studyFlow.length > 0) ||
      (lesson.resources && lesson.resources.length > 0) ? (
        <section className="portal-columns">
          {lesson.studyFlow && lesson.studyFlow.length > 0 ? (
            <article className="surface reveal">
              <div className="section-heading">
                <p className="mini-label">Study Flow</p>
                <h2>How to work this lesson</h2>
              </div>
              <ol className="info-list">
                {lesson.studyFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ) : null}

          {lesson.resources && lesson.resources.length > 0 ? (
            <article className="surface reveal">
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
            </article>
          ) : null}
        </section>
      ) : null}

      <section className="portal-columns">
        <article className="surface reveal">
          <div className="section-heading">
            <p className="mini-label">Grammar / Explanation</p>
            <h2>Study notes</h2>
          </div>
          <div className="note-grid">
            {lesson.explanations.map((explanation) => (
              <article className="note-card" key={explanation.title}>
                <h3>{explanation.title}</h3>
                <p>{explanation.body}</p>
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
        </article>

        <article className="surface reveal">
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
        </article>
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

      <section className="surface reveal">
        <div className="section-heading">
          <p className="mini-label">Practice</p>
          <h2>Choose how you want to work</h2>
        </div>
        <div className="practice-grid">
          {lesson.practiceSets.map((practiceSet) => {
            const entry = getPracticeProgress(progress, practiceSet.id)

            return (
              <article className="practice-card" key={practiceSet.id}>
                <div className="card-topline">
                  <span className="badge badge-soft">
                    {getPracticeTypeLabel(practiceSet.type)}
                  </span>
                  <span className="subtle-text">
                    {entry ? `${entry.attempts} attempts` : 'Fresh set'}
                  </span>
                </div>
                <h3>{practiceSet.title}</h3>
                <p>{practiceSet.instructions}</p>
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
                    <span className="tag" key={`${practiceSet.id}-${topic}`}>
                      {topicLabels[topic]}
                    </span>
                  ))}
                </div>
                <button
                  className="button-primary"
                  onClick={() => onStartPractice(practiceSet.id)}
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
