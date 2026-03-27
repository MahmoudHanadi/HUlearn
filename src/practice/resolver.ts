import type { Lesson } from '../content/types'
import { buildBaseResolvedLesson } from './atoms'
import { generatePracticeActivities } from './generators'
import type {
  FlashcardActivity,
  MatchingActivity,
  MultipleChoiceActivity,
  PracticeActivity,
  ResolvedLesson,
} from './types'

function normalizeLegacyFillActivity(
  lessonId: string,
  activity: Lesson['practiceSets'][number],
): PracticeActivity {
  if (activity.type === 'fill') {
    const normalized: MultipleChoiceActivity = {
      id: activity.id,
      lessonId,
      type: 'multiple-choice',
      category: 'core',
      title: activity.title,
      instructions: activity.instructions,
      origin: 'legacy',
      itemIds: activity.questions.map((question) => `${lessonId}::legacy-item::${question.id}`),
      sessionSize: activity.sessionSize,
      questions: activity.questions.map((question) => ({
        id: question.id,
        itemId: `${lessonId}::legacy-item::${question.id}`,
        prompt: question.prompt,
        choices: question.choices,
        answer: question.answer,
        template: question.template,
        note: question.note,
      })),
    }

    return normalized
  }

  if (activity.type === 'match') {
    const normalized: MatchingActivity = {
      id: activity.id,
      lessonId,
      type: 'matching',
      category: 'core',
      title: activity.title,
      instructions: activity.instructions,
      origin: 'legacy',
      itemIds: activity.pairs.map(
        (_, index) => `${lessonId}::legacy-item::${activity.id}::${index + 1}`,
      ),
      pairs: activity.pairs.map((pair, index) => ({
        id: `${activity.id}::pair::${index + 1}`,
        itemId: `${lessonId}::legacy-item::${activity.id}::${index + 1}`,
        left: pair.left,
        right: pair.right,
      })),
    }

    return normalized
  }

  const normalized: FlashcardActivity = {
    id: activity.id,
    lessonId,
    type: 'flashcards',
    category: 'core',
    title: activity.title,
    instructions: activity.instructions,
    origin: 'legacy',
    itemIds: activity.cards.map(
      (card, index) =>
        `${lessonId}::legacy-item::${activity.id}::${card.id ?? index + 1}`,
    ),
    cards: activity.cards.map((card, index) => ({
      id: `${activity.id}::card::${card.id ?? index + 1}`,
      itemId: `${lessonId}::legacy-item::${activity.id}::${card.id ?? index + 1}`,
      front: card.front,
      back: card.back,
      note: card.note,
    })),
    frontLabel: activity.frontLabel,
    backLabel: activity.backLabel,
    sessionSize: activity.sessionSize,
  }

  return normalized
}

function normalizeLegacyActivities(lesson: Lesson) {
  return lesson.practiceSets.map((activity) =>
    normalizeLegacyFillActivity(lesson.id, activity),
  )
}

function activitySortValue(activity: PracticeActivity) {
  const categoryOrder = {
    core: 0,
    review: 1,
    game: 2,
  }
  return categoryOrder[activity.category]
}

export function resolveLesson(lesson: Lesson): ResolvedLesson {
  const resolvedBase = buildBaseResolvedLesson(lesson)
  const legacyActivities = normalizeLegacyActivities(lesson)
  const generatedActivities = generatePracticeActivities({
    ...resolvedBase,
    activities: legacyActivities,
    practiceSets: legacyActivities,
  })
  const activities = [...legacyActivities, ...generatedActivities].sort((left, right) => {
    const categoryDifference = activitySortValue(left) - activitySortValue(right)

    if (categoryDifference !== 0) {
      return categoryDifference
    }

    if (left.origin !== right.origin) {
      return left.origin === 'legacy' ? -1 : 1
    }

    return left.title.localeCompare(right.title)
  })

  return {
    ...resolvedBase,
    activities,
    practiceSets: activities,
  }
}

export function resolveLessons(lessons: Lesson[]) {
  return lessons.map(resolveLesson)
}
