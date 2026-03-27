import type {
  ExampleItem,
  ExampleTarget,
  FlashcardPracticeSet,
  FillPracticeSet,
  Lesson,
  MatchPracticeSet,
  PatternSeed,
  PracticeGeneratorKey,
  VocabularyItem,
} from '../content/types'
import type { JSX } from 'react'
import type { ProgressState } from './progress'

export type PracticeActivityType =
  | 'flashcards'
  | 'multiple-choice'
  | 'matching'
  | 'ordering'

export type PracticeActivityCategory = 'core' | 'review' | 'game'

export interface ResolvedVocabularyItem extends Omit<VocabularyItem, 'id'> {
  id: string
}

export interface ResolvedExampleTarget extends Omit<ExampleTarget, 'id'> {
  id: string
}

export interface ResolvedExampleItem extends Omit<ExampleItem, 'id' | 'targets'> {
  id: string
  targets: ResolvedExampleTarget[]
}

export interface PracticeSeedItem {
  id: string
  label: string
  answer: string
  prompt?: string
  note?: string
  sourceKind: 'vocabulary' | 'example' | 'pattern' | 'legacy'
}

export interface ActivityOutcome {
  itemId: string
  correct: boolean
}

export interface PracticeActivityBase {
  id: string
  lessonId: string
  type: PracticeActivityType
  category: PracticeActivityCategory
  title: string
  instructions: string
  origin: 'legacy' | 'generated'
  generatorKey?: PracticeGeneratorKey
  itemIds: string[]
}

export interface MultipleChoiceQuestion {
  id: string
  itemId: string
  prompt: string
  promptDetail?: string
  choices: string[]
  answer: string
  acceptedAnswers?: string[]
  template?: string
  note?: string
}

export interface MultipleChoiceActivity extends PracticeActivityBase {
  type: 'multiple-choice'
  questions: MultipleChoiceQuestion[]
  sessionSize?: number
}

export interface MatchingPair {
  id: string
  itemId: string
  left: string
  right: string
}

export interface MatchingActivity extends PracticeActivityBase {
  type: 'matching'
  pairs: MatchingPair[]
}

export interface ActivityFlashcard {
  id: string
  itemId: string
  front: string
  back: string
  note?: string
}

export interface FlashcardActivity extends PracticeActivityBase {
  type: 'flashcards'
  cards: ActivityFlashcard[]
  sessionSize?: number
  frontLabel?: string
  backLabel?: string
}

export interface OrderingPrompt {
  id: string
  itemId: string
  prompt: string
  answerChunks: string[]
  note?: string
}

export interface OrderingActivity extends PracticeActivityBase {
  type: 'ordering'
  prompts: OrderingPrompt[]
  sessionSize?: number
}

export type PracticeActivity =
  | FlashcardActivity
  | MatchingActivity
  | MultipleChoiceActivity
  | OrderingActivity

export type LegacyPracticeActivity =
  | FillPracticeSet
  | MatchPracticeSet
  | FlashcardPracticeSet

export interface PracticeAtomBase {
  id: string
  lessonId: string
  kind: 'vocabulary' | 'example-target' | 'pattern' | 'legacy-activity'
}

export interface VocabularyAtom extends PracticeAtomBase {
  kind: 'vocabulary'
  vocabulary: ResolvedVocabularyItem
}

export interface ExampleTargetAtom extends PracticeAtomBase {
  kind: 'example-target'
  example: ResolvedExampleItem
  target: ResolvedExampleTarget
}

export interface PatternAtom extends PracticeAtomBase {
  kind: 'pattern'
  pattern: PatternSeed
}

export interface LegacyActivityAtom extends PracticeAtomBase {
  kind: 'legacy-activity'
  activity: LegacyPracticeActivity
}

export type PracticeAtom =
  | ExampleTargetAtom
  | LegacyActivityAtom
  | PatternAtom
  | VocabularyAtom

export interface ResolvedLesson extends Omit<Lesson, 'examples' | 'practiceSets' | 'vocabulary'> {
  vocabulary: ResolvedVocabularyItem[]
  examples: ResolvedExampleItem[]
  activities: PracticeActivity[]
  practiceSets: PracticeActivity[]
}

export interface PracticePluginProps<TActivity extends PracticeActivity> {
  activity: TActivity
  lesson: ResolvedLesson
  progress: ProgressState
  sessionKey: number
  onComplete: (score: number, total: number, outcomes: ActivityOutcome[]) => void
  onRestart: () => void
}

export interface PracticePlugin<TActivity extends PracticeActivity = PracticeActivity> {
  type: TActivity['type']
  label: string
  render: (props: PracticePluginProps<TActivity>) => JSX.Element
}
