import { lessons, topicLabels, tracks } from '../content/lessons'
import {
  formatPercent,
  getLessonProgress,
  getTrackById,
  type ProgressState,
} from '../lib/app-state'
import { FilterChip } from './atoms'

interface HomeViewProps {
  progress: ProgressState
  trackFilter: string
  topicFilter: string
  onTrackFilterChange: (trackId: string) => void
  onTopicFilterChange: (topicId: string) => void
  onOpenLesson: (lessonId: string) => void
}

export function HomeView({
  progress,
  trackFilter,
  topicFilter,
  onTrackFilterChange,
  onTopicFilterChange,
  onOpenLesson,
}: HomeViewProps) {
  const totalPracticeSets = lessons.reduce(
    (sum, lesson) => sum + lesson.practiceSets.length,
    0,
  )
  const startedPracticeSets = Object.keys(progress).length
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
  const progressEntries = Object.values(progress)
  const averageBestScore =
    progressEntries.length > 0
      ? progressEntries.reduce((sum, entry) => sum + entry.bestScore, 0) /
        progressEntries.length
      : null

  return (
    <>
      <section className="library-header surface reveal">
        <div className="library-header-copy">
          <p className="eyebrow">Library</p>
          <h1>Choose a lesson and start learning.</h1>
          <p className="hero-text">
            Vocabulary-first Hungarian practice for conversation and citizenship
            preparation.
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
