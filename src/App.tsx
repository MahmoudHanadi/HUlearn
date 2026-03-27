import { useEffect, useState } from 'react'
import './App.css'
import { lessons as lessonCatalog, tracks } from './content/lessons'
import { AboutView } from './components/AboutView'
import { CuratedLearningView } from './components/CuratedLearningView'
import { Header } from './components/Header'
import { HomeView } from './components/HomeView'
import { LessonView } from './components/LessonView'
import { PracticeView } from './components/PracticeView'
import {
  getTrackById,
  navigateTo,
  parseHash,
  readLearningExpandedPreference,
  readProgress,
  type ProgressState,
  type Route,
  writeLearningExpandedPreference,
  writeProgress,
} from './lib/app-state'
import { updateProgressAfterAttempt } from './practice/progress'
import { resolveLessons } from './practice/resolver'
import type { ActivityOutcome } from './practice/types'

const lessons = resolveLessons(lessonCatalog)
const curatedLessons = lessons.filter((lesson) => lesson.trackId === 'curated-learning')

function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  const [progress, setProgress] = useState<ProgressState>(() => readProgress())
  const [trackFilter, setTrackFilter] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const [isLearningExpanded, setIsLearningExpanded] = useState(() =>
    readLearningExpandedPreference(),
  )

  useEffect(() => {
    if (!window.location.hash) {
      navigateTo({ view: 'home' })
    }

    function handleHashChange() {
      setRoute(parseHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    writeProgress(progress)
  }, [progress])

  useEffect(() => {
    writeLearningExpandedPreference(isLearningExpanded)
  }, [isLearningExpanded])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route])

  const currentLesson =
    route.view === 'lesson' || route.view === 'practice'
      ? lessons.find((lesson) => lesson.id === route.lessonId) ?? null
      : null
  const currentPractice =
    route.view === 'practice' && currentLesson
      ? currentLesson.activities.find((activity) => activity.id === route.practiceId) ?? null
      : null
  const currentTrack =
    route.view === 'curated'
      ? getTrackById(tracks, 'curated-learning')
      : currentLesson
        ? getTrackById(tracks, currentLesson.trackId)
        : undefined
  const lessonBackRoute =
    currentLesson?.trackId === 'curated-learning'
      ? { view: 'curated' as const }
      : { view: 'home' as const }
  const lessonBackLabel =
    currentLesson?.trackId === 'curated-learning'
      ? 'Back to curated learning'
      : 'Back to library'

  function openLesson(lessonId: string) {
    navigateTo({ view: 'lesson', lessonId })
  }

  function openPractice(lessonId: string, practiceId: string) {
    navigateTo({ view: 'practice', lessonId, practiceId })
  }

  function recordPracticeResult(
    activityId: string,
    score: number,
    total: number,
    outcomes: ActivityOutcome[],
  ) {
    if (!currentLesson || !currentPractice || currentPractice.id !== activityId) {
      return
    }

    setProgress((previous) => {
      return updateProgressAfterAttempt(
        previous,
        currentLesson.id,
        currentPractice,
        score,
        total,
        outcomes,
      )
    })
  }

  function handleTrackFilterChange(nextTrackId: string) {
    setTrackFilter(nextTrackId)

    if (
      topicFilter !== 'all' &&
      nextTrackId !== 'all' &&
      !lessons.some(
        (lesson) =>
          lesson.trackId === nextTrackId && lesson.topics.includes(topicFilter),
      )
    ) {
      setTopicFilter('all')
    }
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <Header
        currentTrack={currentTrack}
        onAbout={() => navigateTo({ view: 'about' })}
        onCurated={() => navigateTo({ view: 'curated' })}
        onHome={() => navigateTo({ view: 'home' })}
        route={route}
      />

      <main className="page">
        {route.view === 'home' ? (
          <HomeView
            lessons={lessons}
            onOpenLesson={openLesson}
            onTopicFilterChange={setTopicFilter}
            onTrackFilterChange={handleTrackFilterChange}
            progress={progress}
            topicFilter={topicFilter}
            trackFilter={trackFilter}
          />
        ) : null}

        {route.view === 'curated' ? (
          <CuratedLearningView
            lessons={curatedLessons}
            onOpenLesson={openLesson}
            onOpenLibrary={() => navigateTo({ view: 'home' })}
            progress={progress}
          />
        ) : null}

        {route.view === 'about' ? (
          <AboutView onOpenLibrary={() => navigateTo({ view: 'home' })} />
        ) : null}

        {route.view === 'lesson' && currentLesson ? (
          <LessonView
            backLabel={lessonBackLabel}
            isLearningExpanded={isLearningExpanded}
            lesson={currentLesson}
            onBack={() => navigateTo(lessonBackRoute)}
            onLearningExpandedChange={setIsLearningExpanded}
            onStartPractice={(practiceId) =>
              openPractice(currentLesson.id, practiceId)
            }
            progress={progress}
          />
        ) : null}

        {route.view === 'practice' && currentLesson && currentPractice ? (
          <PracticeView
            activity={currentPractice}
            lesson={currentLesson}
            onBack={() =>
              navigateTo({ view: 'lesson', lessonId: currentLesson.id })
            }
            onComplete={recordPracticeResult}
            progress={progress}
          />
        ) : null}

        {((route.view === 'lesson' && !currentLesson) ||
          (route.view === 'practice' && (!currentLesson || !currentPractice))) && (
          <section className="surface reveal">
            <div className="result-panel">
              <p className="eyebrow">Not found</p>
              <h2>This route does not point to a lesson yet.</h2>
              <p className="hero-text">
                Return to the library and open one of the starter portals.
              </p>
              <button
                className="button-primary"
                onClick={() => navigateTo({ view: 'home' })}
                type="button"
              >
                Back to library
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
