export interface Track {
  id: string
  name: string
  subtitle: string
  description: string
}

export interface ExplanationTable {
  title?: string
  columns: string[]
  rows: string[][]
  note?: string
  compact?: boolean
}

export interface ExplanationCard {
  title: string
  body: string
  tips?: string[]
  tables?: ExplanationTable[]
}

export interface VocabularyItem {
  id?: string
  hungarian: string
  english: string
  note?: string
  tags?: string[]
  partOfSpeech?:
    | 'word'
    | 'phrase'
    | 'verb'
    | 'noun'
    | 'adjective'
    | 'adverb'
    | 'question'
    | 'pattern'
  register?: 'informal' | 'neutral' | 'polite'
  distractorGroup?: string
  forms?: Record<string, string>
}

export interface ExampleTarget {
  id?: string
  text: string
  kind: 'vocabulary' | 'phrase' | 'ending' | 'pattern'
  sourceVocabularyId?: string
  acceptedAnswers?: string[]
  distractorGroup?: string
}

export interface ExampleItem {
  id?: string
  hungarian: string
  english: string
  focus?: string
  targets?: ExampleTarget[]
  chunks?: string[]
  scenarioTags?: string[]
}

export interface LessonResource {
  title: string
  url: string
  note?: string
}

export interface FillQuestion {
  id: string
  prompt: string
  template: string
  choices: string[]
  answer: string
  note?: string
}

export interface MatchPair {
  left: string
  right: string
}

export interface FlashcardCard {
  id?: string
  front: string
  back: string
  note?: string
}

interface PracticeSetBase {
  id: string
  title: string
  instructions: string
}

export interface FillPracticeSet extends PracticeSetBase {
  type: 'fill'
  questions: FillQuestion[]
  sessionSize?: number
}

export interface MatchPracticeSet extends PracticeSetBase {
  type: 'match'
  pairs: MatchPair[]
}

export interface FlashcardPracticeSet extends PracticeSetBase {
  type: 'flashcards'
  cards: FlashcardCard[]
  sessionSize?: number
  frontLabel?: string
  backLabel?: string
}

export type LegacyPracticeSet =
  | FillPracticeSet
  | MatchPracticeSet
  | FlashcardPracticeSet

export type PracticeSet = LegacyPracticeSet

export interface PatternSlot {
  id: string
  values: string[]
  defaultValue?: string
  role?: 'subject' | 'register' | 'time' | 'location' | 'object' | 'verb-form'
}

export interface PatternSeed {
  id: string
  prompt: string
  englishCue?: string
  template?: string
  answer: string | string[]
  acceptedAnswers?: string[]
  distractors?: string[]
  tags?: string[]
  slots?: PatternSlot[]
}

export type PracticeGeneratorKey =
  | 'vocabulary_flashcards'
  | 'vocabulary_reverse_choice'
  | 'example_cloze'
  | 'example_ordering'
  | 'review_weak_mix'
  | 'pattern_choice'
  | 'pattern_transform'

export interface PracticeGeneratorSpec {
  key: PracticeGeneratorKey
  enabled?: boolean
  category?: 'core' | 'review' | 'game'
  options?: Record<string, unknown>
}

export interface LessonPracticeConfig {
  generators: PracticeGeneratorSpec[]
  sessionDefaults?: {
    roundSize?: number
    reviewSize?: number
  }
  disableDuplicateGeneratedActivities?: boolean
}

export interface Lesson {
  id: string
  trackId: string
  topics: string[]
  level: string
  phase?: string
  sequence?: number
  title: string
  subtitle: string
  summary: string
  sourceUnits: string[]
  goals: string[]
  studyFlow?: string[]
  resources?: LessonResource[]
  explanations: ExplanationCard[]
  vocabulary: VocabularyItem[]
  examples: ExampleItem[]
  patterns?: PatternSeed[]
  practice?: LessonPracticeConfig
  practiceSets: PracticeSet[]
}
