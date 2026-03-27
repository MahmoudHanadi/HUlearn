import { lessons, tracks } from '../content/lessons'
import { resolveLessons } from '../practice/resolver'

const resolvedLessons = resolveLessons(lessons)

interface AboutViewProps {
  onOpenLibrary: () => void
}

export function AboutView({ onOpenLibrary }: AboutViewProps) {
  const practiceSetCount = resolvedLessons.reduce(
    (sum, lesson) => sum + lesson.activities.length,
    0,
  )

  return (
    <>
      <section className="guide-hero surface reveal">
        <p className="eyebrow">About HUlearn</p>
        <h1>Practice conversational Hungarian without extra noise.</h1>
        <p className="hero-text">
          This app is a personal, static study library built around focused lesson
          portals, short grammar notes, and repeatable vocabulary practice.
        </p>
        <button className="button-primary" onClick={onOpenLibrary} type="button">
          Open library
        </button>
      </section>

      <section className="guide-grid">
        <article className="surface reveal">
          <div className="section-heading">
            <p className="mini-label">Mission</p>
            <h2>What the app is for</h2>
          </div>
          <ul className="info-list">
            <li>Build conversational Hungarian with a strong vocabulary bias.</li>
            <li>Keep grammar practical and attached to real speaking situations.</li>
            <li>Support simplified citizenship preparation with reusable self-introduction language.</li>
          </ul>
        </article>

        <article className="surface reveal">
          <div className="section-heading">
            <p className="mini-label">How it works</p>
            <h2>The study flow</h2>
          </div>
          <ul className="info-list">
            <li>Choose a lesson portal from the library.</li>
            <li>Read the short explanation, vocabulary, and example sentences.</li>
            <li>Pick a practice mode and repeat it until the patterns feel automatic.</li>
          </ul>
        </article>
      </section>

      <section className="guide-metrics surface reveal">
        <div className="filter-panel-head">
          <div>
            <p className="mini-label">Current scope</p>
            <h2>Starter library</h2>
          </div>
        </div>

        <div className="library-stats">
          <article className="compact-stat">
            <span>{lessons.length}</span>
            <p>lesson portals</p>
          </article>
          <article className="compact-stat">
            <span>{practiceSetCount}</span>
            <p>practice sets</p>
          </article>
          <article className="compact-stat">
            <span>{tracks.length}</span>
            <p>study tracks</p>
          </article>
        </div>
      </section>

      <section className="track-strip reveal">
        {tracks.map((track) => {
          const lessonCount = lessons.filter(
            (lesson) => lesson.trackId === track.id,
          ).length

          return (
            <article
              className={`track-card surface track-frame track-${track.id}`}
              key={track.id}
            >
              <span className={`badge track-badge track-${track.id}`}>{track.subtitle}</span>
              <h2>{track.name}</h2>
              <p>{track.description}</p>
              <p className="track-meta">{lessonCount} lessons ready</p>
            </article>
          )
        })}
      </section>
    </>
  )
}
