export interface Track {
  id: string
  name: string
  subtitle: string
  description: string
}

export interface ExplanationCard {
  title: string
  body: string
  tips?: string[]
}

export interface VocabularyItem {
  hungarian: string
  english: string
  note?: string
}

export interface ExampleItem {
  hungarian: string
  english: string
  focus?: string
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

export type PracticeSet =
  | FillPracticeSet
  | MatchPracticeSet
  | FlashcardPracticeSet

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
  practiceSets: PracticeSet[]
}
