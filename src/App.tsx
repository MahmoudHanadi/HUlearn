import { useEffect, useState } from 'react'
import './App.css'
import { lessons, tracks } from './content/lessons'
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
  readProgress,
  type ProgressEntry,
  type ProgressState,
  type Route,
  writeProgress,
} from './lib/app-state'

function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  const [progress, setProgress] = useState<ProgressState>(() => readProgress())
  const [trackFilter, setTrackFilter] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route])

  const currentLesson =
    route.view === 'lesson' || route.view === 'practice'
      ? lessons.find((lesson) => lesson.id === route.lessonId) ?? null
      : null
  const currentPractice =
    route.view === 'practice' && currentLesson
      ? currentLesson.practiceSets.find(
          (practiceSet) => practiceSet.id === route.practiceId,
        ) ?? null
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

  function recordPracticeResult(practiceId: string, score: number, total: number) {
    if (!currentLesson) {
      return
    }

    const ratio = score / total

    setProgress((previous) => {
      const existingEntry = previous[practiceId]
      const nextEntry: ProgressEntry = {
        attempts: existingEntry ? existingEntry.attempts + 1 : 1,
        bestScore: existingEntry
          ? Math.max(existingEntry.bestScore, ratio)
          : ratio,
        lastScore: ratio,
        lastCompletedAt: new Date().toISOString(),
        lessonId: currentLesson.id,
        practiceId,
      }

      return {
        ...previous,
        [practiceId]: nextEntry,
      }
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
            lesson={currentLesson}
            onBack={() => navigateTo(lessonBackRoute)}
            onStartPractice={(practiceId) =>
              openPractice(currentLesson.id, practiceId)
            }
            progress={progress}
          />
        ) : null}

        {route.view === 'practice' && currentLesson && currentPractice ? (
          <PracticeView
            lesson={currentLesson}
            onBack={() =>
              navigateTo({ view: 'lesson', lessonId: currentLesson.id })
            }
            onComplete={recordPracticeResult}
            practiceSet={currentPractice}
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
