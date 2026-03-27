import { topicLabels, tracks } from '../content/lessons'
import {
  formatPercent,
  getLessonProgress,
  getTrackById,
  type ProgressEntry,
  type ProgressState,
} from '../lib/app-state'
import type { ResolvedLesson } from '../practice/types'
import { FilterChip } from './atoms'

interface HomeViewProps {
  lessons: ResolvedLesson[]
  progress: ProgressState
  trackFilter: string
  topicFilter: string
  onTrackFilterChange: (trackId: string) => void
  onTopicFilterChange: (topicId: string) => void
  onOpenLesson: (lessonId: string) => void
}

function compareLessons(left: ResolvedLesson, right: ResolvedLesson) {
  return (left.sequence ?? Number.MAX_SAFE_INTEGER) - (right.sequence ?? Number.MAX_SAFE_INTEGER)
}

function getLatestProgressEntry(entries: ProgressEntry[]) {
  return entries.reduce<ProgressEntry | null>((latest, entry) => {
    if (latest === null) {
      return entry
    }

    return new Date(entry.lastCompletedAt).getTime() >
      new Date(latest.lastCompletedAt).getTime()
      ? entry
      : latest
  }, null)
}

export function HomeView({
  lessons,
  progress,
  trackFilter,
  topicFilter,
  onTrackFilterChange,
  onTopicFilterChange,
  onOpenLesson,
}: HomeViewProps) {
  const totalPracticeSets = lessons.reduce(
    (sum, lesson) => sum + lesson.activities.length,
    0,
  )
  const progressEntries = Object.values(progress.activities)
  const startedPracticeSets = progressEntries.length
  const hasProgress = startedPracticeSets > 0
  const lessonsStarted = new Set(progressEntries.map((entry) => entry.lessonId)).size
  const allTopicIds = [...new Set(lessons.flatMap((lesson) => lesson.topics))]
  const filteredLessons = lessons.filter((lesson) => {
    const matchesTrack = trackFilter === 'all' || lesson.trackId === trackFilter
    const matchesTopic =
      topicFilter === 'all' || lesson.topics.includes(topicFilter)
    return matchesTrack && matchesTopic
  })
  const visibleTopicIds = [
    ...new Set(
      lessons
        .filter((lesson) => trackFilter === 'all' || lesson.trackId === trackFilter)
        .flatMap((lesson) => lesson.topics),
    ),
  ]
  const averageBestScore =
    progressEntries.length > 0
      ? progressEntries.reduce((sum, entry) => sum + entry.bestScore, 0) /
        progressEntries.length
      : null
  const orderedCuratedLessons = [...lessons]
    .filter((lesson) => lesson.trackId === 'curated-learning')
    .sort(compareLessons)
  const nextCuratedLesson =
    orderedCuratedLessons.find(
      (lesson) => getLessonProgress(progress, lesson).startedSets === 0,
    ) ??
    orderedCuratedLessons[0] ??
    lessons[0]
  const latestProgressEntry = getLatestProgressEntry(progressEntries)
  const resumeLesson = latestProgressEntry
    ? lessons.find((lesson) => lesson.id === latestProgressEntry.lessonId) ?? null
    : null
  const focusLesson = resumeLesson ?? nextCuratedLesson

  if (!focusLesson) {
    return null
  }

  const focusTrack = getTrackById(tracks, focusLesson.trackId)
  const focusLessonProgress = getLessonProgress(progress, focusLesson)
  const welcomeTitle = hasProgress
    ? 'Ease back into your next Hungarian session.'
    : 'Start with one calm first step.'
  const welcomeBody = hasProgress
    ? `Resume ${focusLesson.title} or browse the library if you want something lighter. One short practice set is enough to rebuild momentum.`
    : `Begin with ${focusLesson.title} and keep the first session short. One lesson and one practice set is enough to get moving.`
  const focusSummary = hasProgress
    ? `You last worked here. ${focusLessonProgress.startedSets}/${focusLessonProgress.totalSets} sets tried in this lesson.`
    : `Recommended starting point from the guided path. ${focusLessonProgress.totalSets} practice sets are ready here.`
  const sessionSummary = hasProgress
    ? `${startedPracticeSets} practice sets tried across ${lessonsStarted} lessons. Best average: ${formatPercent(averageBestScore)}.`
    : `${lessons.length} lessons and ${totalPracticeSets} practice sets are ready when you want more.`
  const welcomeSteps = hasProgress
    ? [
        {
          title: 'Open your last lesson.',
          body: 'Pick up where you stopped instead of restarting from zero.',
        },
        {
          title: 'Do one familiar set first.',
          body: 'A quick win makes it easier to continue.',
        },
        {
          title: 'Stop after one new set.',
          body: 'Keep the session light so coming back tomorrow feels easy.',
        },
      ]
    : [
        {
          title: 'Open the starter lesson.',
          body: 'Start with sound, reading, and a few repeatable beginner words.',
        },
        {
          title: 'Finish one short practice set.',
          body: 'You only need one small success to begin the habit.',
        },
        {
          title: 'Leave with one useful phrase.',
          body: 'End the session before it feels heavy.',
        },
      ]

  function jumpToLibrary() {
    onTrackFilterChange('all')
    onTopicFilterChange('all')
    window.requestAnimationFrame(() => {
      document.getElementById('lesson-library')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <>
      <section
        className={`welcome-hero surface reveal track-frame track-${focusLesson.trackId}`}
      >
        <div className="welcome-hero-copy">
          <div>
            <p className="eyebrow">{hasProgress ? 'Welcome back' : 'Welcome'}</p>
            <h1>{welcomeTitle}</h1>
            <p className="hero-text">{welcomeBody}</p>
          </div>

          <div className="welcome-pill-row">
            <span className="subtle-pill">10 to 15 minutes is enough</span>
            <span className="subtle-pill">
              {hasProgress ? 'Resume one lesson' : 'Start with one lesson'}
            </span>
            <span className="subtle-pill">Progress saves automatically</span>
          </div>

          <div className="hero-actions">
            <button
              className="button-primary"
              onClick={() => onOpenLesson(focusLesson.id)}
              type="button"
            >
              {hasProgress ? 'Continue lesson' : 'Start here'}
            </button>
            <button className="button-secondary" onClick={jumpToLibrary} type="button">
              Browse library
            </button>
          </div>
        </div>

        <aside className="welcome-plan">
          <div className="welcome-plan-head">
            <p className="mini-label">Session focus</p>
            <h2>{focusLesson.title}</h2>
            <p className="lesson-subtitle">{focusLesson.subtitle}</p>
          </div>

          <div className="welcome-plan-meta">
            <span className={`badge track-badge track-${focusTrack.id}`}>
              {focusTrack.name}
            </span>
            {focusLesson.sequence ? (
              <span className="subtle-pill">Step {focusLesson.sequence}</span>
            ) : null}
            <span className="subtle-pill">{focusLesson.level}</span>
          </div>

          <p className="welcome-plan-summary">{focusSummary}</p>

          <ol className="welcome-step-list">
            {welcomeSteps.map((step, index) => (
              <li className="welcome-step-item" key={step.title}>
                <span aria-hidden="true" className="welcome-step-number">
                  {index + 1}
                </span>
                <div className="welcome-step-copy">
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="subtle-text">{sessionSummary}</p>
        </aside>
      </section>

      <section className="library-header surface reveal" id="lesson-library">
        <div className="library-header-copy">
          <p className="eyebrow">Lesson library</p>
          <h2>Browse the full lesson collection.</h2>
          <p className="hero-text">
            Jump between conversation, grammar, curated learning, citizenship, and
            vocabulary whenever you want.
          </p>
        </div>

        <div className="library-stats">
          <article className="compact-stat">
            <span>{lessons.length}</span>
            <p>lesson portals</p>
          </article>
          <article className="compact-stat">
            <span>{totalPracticeSets}</span>
            <p>practice sets</p>
          </article>
          <article className="compact-stat">
            <span>{startedPracticeSets}</span>
            <p>{`started / ${formatPercent(averageBestScore)} best`}</p>
          </article>
        </div>
      </section>

      <section className="filter-panel surface reveal">
        <div className="filter-panel-head">
          <div>
            <p className="mini-label">Filters</p>
            <h2>Find the topic you want right now.</h2>
          </div>
          <span className="subtle-pill">{filteredLessons.length} visible</span>
        </div>

        <div className="filter-group">
          <p className="filter-label">Tracks</p>
          <div className="chip-row">
            <FilterChip
              isActive={trackFilter === 'all'}
              label="All tracks"
              onClick={() => onTrackFilterChange('all')}
            />
            {tracks.map((track) => (
              <FilterChip
                className={`track-pill track-${track.id}`}
                isActive={trackFilter === track.id}
                key={track.id}
                label={track.name}
                onClick={() => onTrackFilterChange(track.id)}
              />
            ))}
          </div>
        </div>

        <div className="filter-group">
          <p className="filter-label">Topics</p>
          <div className="chip-row">
            <FilterChip
              isActive={topicFilter === 'all'}
              label="All topics"
              onClick={() => onTopicFilterChange('all')}
            />
            {allTopicIds
              .filter((topicId) => visibleTopicIds.includes(topicId))
              .map((topicId) => (
                <FilterChip
                  isActive={topicFilter === topicId}
                  key={topicId}
                  label={topicLabels[topicId]}
                  onClick={() => onTopicFilterChange(topicId)}
                />
              ))}
          </div>
        </div>
      </section>

      {filteredLessons.length === 0 ? (
        <section className="surface reveal">
          <div className="result-panel">
            <p className="eyebrow">No matches</p>
            <h2>No lesson fits these filters yet.</h2>
            <p className="hero-text">
              Reset the track or topic filter to return to the full library.
            </p>
            <button
              className="button-primary"
              onClick={() => {
                onTrackFilterChange('all')
                onTopicFilterChange('all')
              }}
              type="button"
            >
              Reset filters
            </button>
          </div>
        </section>
      ) : (
        <section className="lesson-grid">
          {filteredLessons.map((lesson) => {
            const lessonProgress = getLessonProgress(progress, lesson)
            const track = getTrackById(tracks, lesson.trackId)

            return (
              <article
                className={`lesson-card surface reveal track-frame track-${lesson.trackId}`}
                key={lesson.id}
              >
                <div className="card-topline">
                  <span className={`badge track-badge track-${track.id}`}>{track.name}</span>
                  <span className="subtle-text">{lesson.level}</span>
                </div>

                <div className="lesson-copy">
                  <h2>{lesson.title}</h2>
                  <p className="lesson-subtitle">{lesson.subtitle}</p>
                  <p className="lesson-summary">{lesson.summary}</p>
                </div>

                <div className="tag-row">
                  {lesson.topics.map((topic) => (
                    <span className="tag" key={topic}>
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
        </section>
      )}
    </>
  )
}
