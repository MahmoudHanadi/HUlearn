import { topicLabels, tracks } from './catalog'
import { curatedLessons } from './lessons-curated'
import { conversationLessons } from './lessons-conversation'
import { grammarLessons } from './lessons-grammar'
import { profileLessons } from './lessons-profile'
import { vocabularyLessons } from './lessons-vocabulary'

export const lessons = [
  ...curatedLessons,
  ...conversationLessons,
  ...grammarLessons,
  ...profileLessons,
  ...vocabularyLessons,
]

export { topicLabels, tracks }
