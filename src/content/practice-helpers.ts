import type {
  FlashcardCard,
  FlashcardPracticeSet,
  VocabularyItem,
} from './types'

interface FlashcardPracticeSetOptions {
  id: string
  title: string
  instructions: string
  cards: FlashcardCard[]
  sessionSize?: number
  frontLabel?: string
  backLabel?: string
}

interface ScenarioFlashcard {
  scenario: string
  answer: string
  note?: string
}

export function createFlashcardPracticeSet({
  id,
  title,
  instructions,
  cards,
  sessionSize,
  frontLabel,
  backLabel,
}: FlashcardPracticeSetOptions): FlashcardPracticeSet {
  return {
    id,
    type: 'flashcards',
    title,
    instructions,
    cards,
    sessionSize,
    frontLabel,
    backLabel,
  }
}

export function buildVocabularyFlashcardCards(
  items: VocabularyItem[],
): FlashcardCard[] {
  return items.map((item) => ({
    front: item.hungarian,
    back: item.english,
    note: item.note,
  }))
}

export function buildScenarioFlashcardCards(
  scenarios: ScenarioFlashcard[],
): FlashcardCard[] {
  return scenarios.map((scenario) => ({
    front: scenario.scenario,
    back: scenario.answer,
    note: scenario.note,
  }))
}
