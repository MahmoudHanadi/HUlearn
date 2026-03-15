import type { Track } from './types'

export const tracks: Track[] = [
  {
    id: 'core-conversation',
    name: 'Core Conversation',
    subtitle: 'Daily speaking',
    description:
      'Short, repeatable patterns for greetings, introductions, and practical exchanges.',
  },
  {
    id: 'core-grammar',
    name: 'Core Grammar',
    subtitle: 'Structural basics',
    description:
      'Small grammar anchors that make simple spoken sentences easier to build.',
  },
  {
    id: 'citizenship-path',
    name: 'Citizenship Path',
    subtitle: 'Personal profile',
    description:
      'Self-introduction language that supports residence and simplified citizenship preparation.',
  },
  {
    id: 'curated-learning',
    name: 'Curated Learning',
    subtitle: '0 to A2 path',
    description:
      'A guided beginner-to-A2 route built from curated external resources, high-frequency vocabulary, and sequenced practice.',
  },
  {
    id: 'core-vocabulary',
    name: 'Core Vocabulary',
    subtitle: '500 essential words',
    description:
      'A practical 500-word Hungarian track built for repeatable flashcard review and long-term recall.',
  },
]

export const topicLabels: Record<string, string> = {
  alphabet: 'Alphabet',
  pronunciation: 'Pronunciation',
  greetings: 'Greetings',
  politeness: 'Politeness',
  nationality: 'Nationality',
  origin: 'Origin',
  articles: 'Articles',
  descriptions: 'Descriptions',
  numbers: 'Numbers',
  time: 'Time',
  shopping: 'Shopping',
  prices: 'Prices',
  location: 'Location',
  present: 'Present tense',
  introductions: 'Introductions',
  professions: 'Professions',
  scripts: 'Scripts',
  vocabulary: 'Vocabulary',
  frequency: 'High frequency',
  flashcards: 'Flashcards',
  verbs: 'Verbs',
  movement: 'Movement',
  routine: 'Routine',
  travel: 'Travel',
  listening: 'Listening',
  writing: 'Writing',
  health: 'Health',
  planning: 'Planning',
  speaking: 'Speaking',
}
