import { createDefaultPracticeConfig } from '../content/lesson-structure'
import type { LessonPracticeConfig, PracticeGeneratorKey, PracticeGeneratorSpec } from '../content/types'
import type {
  FlashcardActivity,
  MultipleChoiceActivity,
  MultipleChoiceQuestion,
  OrderingActivity,
  OrderingPrompt,
  PracticeActivity,
  PracticeActivityCategory,
  ResolvedLesson,
  ResolvedVocabularyItem,
} from './types'

function buildGeneratorId(lessonId: string, key: PracticeGeneratorKey) {
  return `${lessonId}::generated::${key}`
}

function getPracticeConfig(lesson: ResolvedLesson): LessonPracticeConfig {
  return lesson.practice ?? createDefaultPracticeConfig(lesson.trackId)
}

function getEnabledGenerators(lesson: ResolvedLesson) {
  const practice = getPracticeConfig(lesson)
  return practice.generators.filter((generator) => generator.enabled !== false)
}

function getGeneratorCategory(generator: PracticeGeneratorSpec): PracticeActivityCategory {
  return generator.category ?? (generator.key === 'review_weak_mix' ? 'review' : 'core')
}

function getSessionSize(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
  fallback = 10,
) {
  const defaults = lesson.practice?.sessionDefaults

  if (category === 'review') {
    return defaults?.reviewSize ?? defaults?.roundSize ?? fallback
  }

  return defaults?.roundSize ?? fallback
}

function findChoices(
  vocabulary: ResolvedVocabularyItem[],
  answer: string,
  distractorGroup?: string,
  maxChoices = 4,
) {
  const groupedChoices = vocabulary
    .filter(
      (item) =>
        item.hungarian !== answer &&
        item.distractorGroup &&
        distractorGroup &&
        item.distractorGroup === distractorGroup,
    )
    .map((item) => item.hungarian)

  const fallbackChoices = vocabulary
    .filter((item) => item.hungarian !== answer)
    .map((item) => item.hungarian)

  const choices = [...new Set([...groupedChoices, ...fallbackChoices])]
  return [answer, ...choices.slice(0, Math.max(0, maxChoices - 1))]
}

function buildVocabularyFlashcards(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
): FlashcardActivity | null {
  if (lesson.trackId === 'core-vocabulary' || lesson.vocabulary.length < 4) {
    return null
  }

  return {
    id: buildGeneratorId(lesson.id, 'vocabulary_flashcards'),
    lessonId: lesson.id,
    type: 'flashcards',
    category,
    title: 'Generated vocabulary flashcards',
    instructions:
      'Use the lesson vocabulary in quick recall mode. Say the English meaning first, then flip the card.',
    origin: 'generated',
    generatorKey: 'vocabulary_flashcards',
    itemIds: lesson.vocabulary.map((item) => item.id),
    cards: lesson.vocabulary.map((item) => ({
      id: `${item.id}::card`,
      itemId: item.id,
      front: item.hungarian,
      back: item.english,
      note: item.note,
    })),
    frontLabel: 'Hungarian',
    backLabel: 'English',
    sessionSize: lesson.practice?.sessionDefaults?.roundSize ?? 10,
  }
}

function buildVocabularyReverseChoice(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
): MultipleChoiceActivity | null {
  if (lesson.vocabulary.length < 4) {
    return null
  }

  const questions: MultipleChoiceQuestion[] = lesson.vocabulary.map((item) => ({
    id: `${item.id}::reverse-choice`,
    itemId: item.id,
    prompt: `Choose the Hungarian item for "${item.english}".`,
    choices: findChoices(lesson.vocabulary, item.hungarian, item.distractorGroup),
    answer: item.hungarian,
    note: item.note,
  }))

  return {
    id: buildGeneratorId(lesson.id, 'vocabulary_reverse_choice'),
    lessonId: lesson.id,
    type: 'multiple-choice',
    category,
    title: 'Generated reverse recall',
    instructions:
      'Work from English meaning back to Hungarian so recall is not one-directional.',
    origin: 'generated',
    generatorKey: 'vocabulary_reverse_choice',
    itemIds: lesson.vocabulary.map((item) => item.id),
    questions,
    sessionSize: getSessionSize(lesson, category),
  }
}

function findTargetChoices(
  lesson: ResolvedLesson,
  answer: string,
  distractorGroup?: string,
) {
  return findChoices(lesson.vocabulary, answer, distractorGroup)
}

function replaceFirstOccurrence(text: string, target: string, replacement: string) {
  const index = text.toLowerCase().indexOf(target.toLowerCase())

  if (index === -1) {
    return null
  }

  return `${text.slice(0, index)}${replacement}${text.slice(index + target.length)}`
}

function buildExampleCloze(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
): MultipleChoiceActivity | null {
  const questions = lesson.examples.flatMap((example) =>
    example.targets.flatMap((target) => {
      const template = replaceFirstOccurrence(example.hungarian, target.text, '___')

      if (!template) {
        return []
      }

      return [
        {
          id: `${target.id}::cloze`,
          itemId: target.sourceVocabularyId ?? target.id,
          prompt: example.english,
          template,
          choices: findTargetChoices(
            lesson,
            target.text,
            target.distractorGroup,
          ),
          answer: target.text,
          note: example.focus,
        } satisfies MultipleChoiceQuestion,
      ]
    }),
  )

  if (questions.length === 0) {
    return null
  }

  return {
    id: buildGeneratorId(lesson.id, 'example_cloze'),
    lessonId: lesson.id,
    type: 'multiple-choice',
    category,
    title: 'Generated example cloze',
    instructions:
      'Use the lesson examples as sentence patterns and fill the missing Hungarian chunk.',
    origin: 'generated',
    generatorKey: 'example_cloze',
    itemIds: [...new Set(questions.map((question) => question.itemId))],
    questions,
    sessionSize: getSessionSize(lesson, category),
  }
}

function buildExampleOrdering(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
): OrderingActivity | null {
  const prompts: OrderingPrompt[] = lesson.examples.flatMap((example) => {
    const chunks = example.chunks?.filter(Boolean) ?? []

    if (chunks.length < 3) {
      return []
    }

    return [
      {
        id: `${example.id}::ordering`,
        itemId: example.id,
        prompt: example.english,
        answerChunks: chunks,
        note: example.focus,
      },
    ]
  })

  if (prompts.length === 0) {
    return null
  }

  return {
    id: buildGeneratorId(lesson.id, 'example_ordering'),
    lessonId: lesson.id,
    type: 'ordering',
    category,
    title: 'Generated sentence builder',
    instructions:
      'Rebuild the Hungarian sentence from shuffled chunks to reinforce word order and fixed patterns.',
    origin: 'generated',
    generatorKey: 'example_ordering',
    itemIds: prompts.map((prompt) => prompt.itemId),
    prompts,
    sessionSize: getSessionSize(lesson, category),
  }
}

function buildReviewWeakMix(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
): MultipleChoiceActivity | null {
  if (lesson.vocabulary.length < 4) {
    return null
  }

  const questions: MultipleChoiceQuestion[] = lesson.vocabulary.map((item) => ({
    id: `${item.id}::review`,
    itemId: item.id,
    prompt: `Review: choose the Hungarian item for "${item.english}".`,
    choices: findChoices(lesson.vocabulary, item.hungarian, item.distractorGroup),
    answer: item.hungarian,
    note: item.note,
  }))

  return {
    id: buildGeneratorId(lesson.id, 'review_weak_mix'),
    lessonId: lesson.id,
    type: 'multiple-choice',
    category,
    title: 'Adaptive lesson review',
    instructions:
      'This review mode prioritizes weak and due items from the lesson while keeping the round compact.',
    origin: 'generated',
    generatorKey: 'review_weak_mix',
    itemIds: lesson.vocabulary.map((item) => item.id),
    questions,
    sessionSize: getSessionSize(lesson, category),
  }
}

const PERSON_TAGS = new Set(['én', 'te', 'ő', 'mi', 'ti', 'ők'])

function getPatternAcceptedAnswers(pattern: NonNullable<ResolvedLesson['patterns']>[number]) {
  return pattern.acceptedAnswers ?? (Array.isArray(pattern.answer) ? pattern.answer : [pattern.answer])
}

function getPatternPersonTag(pattern: NonNullable<ResolvedLesson['patterns']>[number]) {
  return pattern.tags?.find((tag) => PERSON_TAGS.has(tag))
}

function getPatternGroupTag(pattern: NonNullable<ResolvedLesson['patterns']>[number]) {
  return pattern.tags?.find((tag) => tag.startsWith('group-') || tag === 'irregular')
}

function buildPatternChoices(
  patterns: NonNullable<ResolvedLesson['patterns']>,
  pattern: NonNullable<ResolvedLesson['patterns']>[number],
  targetCount = 4,
) {
  const acceptedAnswers = getPatternAcceptedAnswers(pattern)
  const personTag = getPatternPersonTag(pattern)
  const groupTag = getPatternGroupTag(pattern)
  const samePersonCandidates = patterns
    .filter((candidate) => candidate.id !== pattern.id && getPatternPersonTag(candidate) === personTag)
    .flatMap(getPatternAcceptedAnswers)
  const sameGroupCandidates = patterns
    .filter((candidate) => candidate.id !== pattern.id && getPatternGroupTag(candidate) === groupTag)
    .flatMap(getPatternAcceptedAnswers)
  const fallbackCandidates = patterns
    .filter((candidate) => candidate.id !== pattern.id)
    .flatMap(getPatternAcceptedAnswers)
  const choices = [
    ...new Set([
      ...acceptedAnswers,
      ...(pattern.distractors ?? []),
      ...samePersonCandidates,
      ...sameGroupCandidates,
      ...fallbackCandidates,
    ]),
  ]

  return choices.slice(0, Math.max(targetCount, acceptedAnswers.length + 2))
}

function buildPatternChoice(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
): MultipleChoiceActivity | null {
  if (!lesson.patterns || lesson.patterns.length === 0) {
    return null
  }

  const questions: MultipleChoiceQuestion[] = lesson.patterns
    .filter((pattern) => pattern.distractors && pattern.distractors.length > 0)
    .map((pattern) => {
      const acceptedAnswers = getPatternAcceptedAnswers(pattern)

      return {
        id: `${pattern.id}::choice`,
        itemId: `${lesson.id}::pattern::${pattern.id}`,
        prompt: pattern.prompt,
        promptDetail: pattern.englishCue,
        choices: buildPatternChoices(lesson.patterns!, pattern),
        answer: acceptedAnswers[0],
        acceptedAnswers,
        template: pattern.template,
      }
    })

  if (questions.length === 0) {
    return null
  }

  return {
    id: buildGeneratorId(lesson.id, 'pattern_choice'),
    lessonId: lesson.id,
    type: 'multiple-choice',
    category,
    title: 'Pattern choice drill',
    instructions:
      'Use the lesson pattern metadata to choose the correct phrase or form for the situation.',
    origin: 'generated',
    generatorKey: 'pattern_choice',
    itemIds: questions.map((question) => question.itemId),
    questions,
    sessionSize: getSessionSize(lesson, category),
  }
}

function buildPatternTransform(
  lesson: ResolvedLesson,
  category: PracticeActivityCategory,
): MultipleChoiceActivity | null {
  if (!lesson.patterns || lesson.patterns.length === 0) {
    return null
  }

  const questions: MultipleChoiceQuestion[] = lesson.patterns
    .filter((pattern) => pattern.distractors && pattern.distractors.length > 0)
    .map((pattern) => {
      const acceptedAnswers = getPatternAcceptedAnswers(pattern)

      return {
        id: `${pattern.id}::transform`,
        itemId: `${lesson.id}::pattern::${pattern.id}`,
        prompt: pattern.englishCue ?? pattern.prompt,
        promptDetail: pattern.englishCue ? pattern.prompt : undefined,
        choices: buildPatternChoices(lesson.patterns!, pattern),
        answer: acceptedAnswers[0],
        acceptedAnswers,
        template: pattern.template,
      }
    })

  if (questions.length === 0) {
    return null
  }

  return {
    id: buildGeneratorId(lesson.id, 'pattern_transform'),
    lessonId: lesson.id,
    type: 'multiple-choice',
    category,
    title: 'Pattern transform drill',
    instructions:
      'Work from the English cue back to the Hungarian form using only answer selection.',
    origin: 'generated',
    generatorKey: 'pattern_transform',
    itemIds: questions.map((question) => question.itemId),
    questions,
    sessionSize: getSessionSize(lesson, category),
  }
}

const GENERATOR_BUILDERS: Record<
  PracticeGeneratorKey,
  (lesson: ResolvedLesson, category: PracticeActivityCategory) => PracticeActivity | null
> = {
  vocabulary_flashcards: buildVocabularyFlashcards,
  vocabulary_reverse_choice: buildVocabularyReverseChoice,
  example_cloze: buildExampleCloze,
  example_ordering: buildExampleOrdering,
  review_weak_mix: buildReviewWeakMix,
  pattern_choice: buildPatternChoice,
  pattern_transform: buildPatternTransform,
}

function isDuplicateActivity(
  generatedActivity: PracticeActivity,
  existingActivities: PracticeActivity[],
) {
  return existingActivities.some(
    (activity) =>
      activity.generatorKey === generatedActivity.generatorKey &&
      activity.type === generatedActivity.type &&
      activity.itemIds.join('|') === generatedActivity.itemIds.join('|'),
  )
}

export function generatePracticeActivities(lesson: ResolvedLesson) {
  const practice = getPracticeConfig(lesson)
  const enabledGenerators = getEnabledGenerators(lesson)
  const activities: PracticeActivity[] = []

  for (const generator of enabledGenerators) {
    const buildActivity = GENERATOR_BUILDERS[generator.key]

    if (!buildActivity) {
      continue
    }

    const activity = buildActivity(lesson, getGeneratorCategory(generator))

    if (!activity) {
      continue
    }

    if (
      practice.disableDuplicateGeneratedActivities !== false &&
      isDuplicateActivity(activity, activities)
    ) {
      continue
    }

    activities.push(activity)
  }

  return activities
}
