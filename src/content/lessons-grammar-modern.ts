import { grammarLessons as legacyGrammarLessons } from './lessons-grammar'
import { presentTenseVerbPatternsLesson } from './lessons-grammar-present-tense'

export const grammarLessons = legacyGrammarLessons.map((lesson) =>
  lesson.id === presentTenseVerbPatternsLesson.id ? presentTenseVerbPatternsLesson : lesson,
)
