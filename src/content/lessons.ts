import { topicLabels, tracks } from './catalog'
import { curatedLessons } from './lessons-curated'
import { conversationLessons } from './lessons-conversation'
import { grammarLessons } from './lessons-grammar-modern'
import { withStandardLessonStructureMany } from './lesson-structure'
import { profileLessons } from './lessons-profile'
import { vocabularyLessons } from './lessons-vocabulary'

export const lessons = withStandardLessonStructureMany([
  ...curatedLessons,
  ...conversationLessons,
  ...grammarLessons,
  ...profileLessons,
  ...vocabularyLessons,
])

export { topicLabels, tracks }
