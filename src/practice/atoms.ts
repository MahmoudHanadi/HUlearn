import type {
  ExampleItem,
  ExampleTarget,
  Lesson,
  PatternSeed,
  VocabularyItem,
} from '../content/types'
import type {
  ExampleTargetAtom,
  LegacyActivityAtom,
  PatternAtom,
  PracticeAtom,
  ResolvedExampleItem,
  ResolvedExampleTarget,
  ResolvedLesson,
  ResolvedVocabularyItem,
  VocabularyAtom,
} from './types'

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

function buildVocabularyId(
  lessonId: string,
  item: VocabularyItem,
  index: number,
) {
  return item.id ?? `${lessonId}::vocab::${index + 1}-${slugify(item.hungarian)}`
}

function buildExampleId(
  lessonId: string,
  example: ExampleItem,
  index: number,
) {
  return example.id ?? `${lessonId}::example::${index + 1}-${slugify(example.hungarian)}`
}

function buildTargetId(
  exampleId: string,
  target: ExampleTarget,
  index: number,
) {
  return target.id ?? `${exampleId}::target::${index + 1}-${slugify(target.text)}`
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildFallbackChunks(sentence: string) {
  const punctuationChunks = sentence
    .split(/(?<=[,.!?])\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  if (punctuationChunks.length >= 3) {
    return punctuationChunks
  }

  const words = sentence.trim().split(/\s+/).filter(Boolean)

  if (words.length < 3) {
    return []
  }

  const chunks: string[] = []

  for (let index = 0; index < words.length; index += 2) {
    chunks.push(words.slice(index, index + 2).join(' '))
  }

  return chunks.length >= 3 ? chunks : []
}

function buildFallbackTargets(
  example: ExampleItem,
  exampleId: string,
  vocabulary: ResolvedVocabularyItem[],
): ResolvedExampleTarget[] {
  const matches = vocabulary
    .filter((item) => {
      const pattern = new RegExp(`\\b${escapeRegExp(item.hungarian)}\\b`, 'i')
      return pattern.test(example.hungarian)
    })
    .sort((left, right) => right.hungarian.length - left.hungarian.length)

  return matches.slice(0, 2).map((match, index) => ({
    id: `${exampleId}::target::fallback-${index + 1}-${slugify(match.hungarian)}`,
    text: match.hungarian,
    kind: 'vocabulary',
    sourceVocabularyId: match.id,
    acceptedAnswers: [match.hungarian],
    distractorGroup: match.distractorGroup,
  }))
}

function normalizeExampleTargets(
  example: ExampleItem,
  exampleId: string,
  vocabulary: ResolvedVocabularyItem[],
): ResolvedExampleTarget[] {
  if (example.targets && example.targets.length > 0) {
    return example.targets.map((target, index) => ({
      ...target,
      id: buildTargetId(exampleId, target, index),
    }))
  }

  return buildFallbackTargets(example, exampleId, vocabulary)
}

export function normalizeVocabularyItems(
  lessonId: string,
  vocabulary: VocabularyItem[],
): ResolvedVocabularyItem[] {
  return vocabulary.map((item, index) => ({
    ...item,
    id: buildVocabularyId(lessonId, item, index),
  }))
}

export function normalizeExamples(
  lessonId: string,
  examples: ExampleItem[],
  vocabulary: ResolvedVocabularyItem[],
): ResolvedExampleItem[] {
  return examples.map((example, index) => {
    const exampleId = buildExampleId(lessonId, example, index)

    return {
      ...example,
      id: exampleId,
      chunks: example.chunks ?? buildFallbackChunks(example.hungarian),
      targets: normalizeExampleTargets(example, exampleId, vocabulary),
    }
  })
}

function createVocabularyAtoms(
  lessonId: string,
  vocabulary: ResolvedVocabularyItem[],
): VocabularyAtom[] {
  return vocabulary.map((item) => ({
    id: item.id,
    lessonId,
    kind: 'vocabulary',
    vocabulary: item,
  }))
}

function createExampleTargetAtoms(
  lessonId: string,
  examples: ResolvedExampleItem[],
): ExampleTargetAtom[] {
  return examples.flatMap((example) =>
    example.targets.map((target) => ({
      id: target.id,
      lessonId,
      kind: 'example-target',
      example,
      target,
    })),
  )
}

function createPatternAtoms(
  lessonId: string,
  patterns: PatternSeed[] | undefined,
): PatternAtom[] {
  if (!patterns || patterns.length === 0) {
    return []
  }

  return patterns.map((pattern) => ({
    id: `${lessonId}::pattern::${pattern.id}`,
    lessonId,
    kind: 'pattern',
    pattern,
  }))
}

function createLegacyActivityAtoms(
  lessonId: string,
  lesson: Lesson,
): LegacyActivityAtom[] {
  return lesson.practiceSets.map((activity) => ({
    id: `${lessonId}::legacy::${activity.id}`,
    lessonId,
    kind: 'legacy-activity',
    activity,
  }))
}

export function normalizeLessonContent(lesson: Lesson) {
  const vocabulary = normalizeVocabularyItems(lesson.id, lesson.vocabulary)
  const examples = normalizeExamples(lesson.id, lesson.examples, vocabulary)

  return {
    vocabulary,
    examples,
  }
}

export function buildPracticeAtoms(lesson: Lesson): PracticeAtom[] {
  const { vocabulary, examples } = normalizeLessonContent(lesson)

  return [
    ...createVocabularyAtoms(lesson.id, vocabulary),
    ...createExampleTargetAtoms(lesson.id, examples),
    ...createPatternAtoms(lesson.id, lesson.patterns),
    ...createLegacyActivityAtoms(lesson.id, lesson),
  ]
}

export function buildBaseResolvedLesson(lesson: Lesson): Omit<
  ResolvedLesson,
  'activities' | 'practiceSets'
> {
  const { vocabulary, examples } = normalizeLessonContent(lesson)

  return {
    ...lesson,
    vocabulary,
    examples,
  }
}

