import type { Lesson, LessonPracticeConfig } from './types'

const DEFAULT_STUDY_FLOW = [
  'Read the study notes first so the main pattern is clear before you start practicing.',
  'Review the key vocabulary and example sentences aloud once before the first exercise round.',
  'Start with the guided practice sets, then move into review to check recall without support.',
  'Return to the lesson notes after practice and compare the forms or chunks that still felt weak.',
]

export function createDefaultPracticeConfig(trackId: string): LessonPracticeConfig {
  const isCuratedTrack = trackId === 'curated-learning'

  return {
    generators: [
      { key: 'vocabulary_flashcards', category: 'core' },
      { key: 'vocabulary_reverse_choice', category: 'core' },
      { key: 'example_cloze', category: 'core' },
      { key: 'example_ordering', category: 'core' },
      { key: 'review_weak_mix', category: 'review' },
    ],
    sessionDefaults: {
      roundSize: trackId === 'core-vocabulary' ? 20 : isCuratedTrack ? 12 : 10,
      reviewSize: isCuratedTrack ? 10 : 8,
    },
    disableDuplicateGeneratedActivities: true,
  }
}

export function withStandardLessonStructure<T extends Lesson>(lesson: T): T {
  return {
    ...lesson,
    studyFlow: lesson.studyFlow ?? DEFAULT_STUDY_FLOW,
    resources: lesson.resources ?? [],
    practice: lesson.practice ?? createDefaultPracticeConfig(lesson.trackId),
  }
}

export function withStandardLessonStructureMany<T extends Lesson>(lessons: T[]): T[] {
  return lessons.map((lesson) => withStandardLessonStructure(lesson))
}
