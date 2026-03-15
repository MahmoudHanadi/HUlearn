import { buildScenarioFlashcardCards, createFlashcardPracticeSet } from './practice-helpers'
import type { Lesson } from './types'

export const profileLessons: Lesson[] = [
  {
    id: 'self-introduction-profile',
    trackId: 'citizenship-path',
    topics: ['introductions', 'professions', 'present'],
    level: 'A1',
    title: 'Self-Introduction Profile',
    subtitle: 'Say your age, profession, and a few simple facts about your life.',
    summary:
      'This portal blends the self-description patterns reinforced around Units 4 and 6, because those are directly relevant to conversational and citizenship-style introductions.',
    sourceUnits: ['Unit 4', 'Unit 6'],
    goals: [
      'Say your age with éves vagyok.',
      'State a profession or role.',
      'Build a short self-introduction with one or two present-tense actions.',
    ],
    explanations: [
      {
        title: 'Age pattern',
        body:
          'Hungarian commonly uses number + éves vagyok to state age. It works as a full chunk and is worth memorizing exactly that way.',
      },
      {
        title: 'Profession statements',
        body:
          'A profession often appears with vagyok: Tanár vagyok. Orvos vagyok. This is efficient and useful in interviews or simple introductions.',
      },
      {
        title: 'First-person present',
        body:
          'Beginner self-introductions become much more natural when you can add one action sentence such as Budapesten élek or Most magyarul tanulok.',
      },
    ],
    vocabulary: [
      { hungarian: 'éves vagyok', english: 'I am ... years old' },
      { hungarian: 'tanár', english: 'teacher' },
      { hungarian: 'orvos', english: 'doctor' },
      { hungarian: 'üzletember', english: 'businessman' },
      { hungarian: 'élek', english: 'I live' },
      { hungarian: 'tanulok', english: 'I study / I am studying' },
    ],
    examples: [
      {
        hungarian: 'Harmincéves vagyok.',
        english: 'I am thirty years old.',
        focus: 'Age statement',
      },
      {
        hungarian: 'Tanár vagyok, és Budapesten élek.',
        english: 'I am a teacher, and I live in Budapest.',
        focus: 'Profession + place',
      },
      {
        hungarian: 'Most magyarul tanulok.',
        english: 'I am studying Hungarian now.',
        focus: 'Present-tense action',
      },
    ],
    practiceSets: [
      {
        id: 'profile-fill',
        type: 'fill',
        title: 'Complete the personal profile',
        instructions:
          'Choose the phrase or word that makes the short self-introduction natural.',
        questions: [
          {
            id: 'p1',
            prompt: 'State your age.',
            template: 'Harminckettő ___ .',
            choices: ['éves vagyok', 'vagy', 'forint'],
            answer: 'éves vagyok',
            note: 'Treat this as one memorized age chunk.',
          },
          {
            id: 'p2',
            prompt: 'Say “I am a teacher.”',
            template: 'Tanár ___.',
            choices: ['vagyok', 'vagy', 'van'],
            answer: 'vagyok',
            note: 'This uses the same identity pattern as nationality statements.',
          },
          {
            id: 'p3',
            prompt: 'Add a present-tense action.',
            template: 'Most magyarul ___.',
            choices: ['tanulok', 'tanár', 'teremben'],
            answer: 'tanulok',
            note: 'This moves the introduction from static facts to real activity.',
          },
        ],
      },
      {
        id: 'profile-match',
        type: 'match',
        title: 'Match personal profile vocabulary',
        instructions:
          'Match the profile words and chunks you need for a short introduction.',
        pairs: [
          { left: 'tanár', right: 'teacher' },
          { left: 'orvos', right: 'doctor' },
          { left: 'üzletember', right: 'businessman' },
          { left: 'élek', right: 'I live' },
          { left: 'tanulok', right: 'I study / I am studying' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'profile-scenario-flashcards',
        title: 'Scenario flashcards for self-introduction',
        instructions:
          'Read the cue and say the profile sentence before you flip the card.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'You say: I am thirty years old.',
            answer: 'Harmincéves vagyok.',
          },
          {
            scenario: 'You say: I am a teacher.',
            answer: 'Tanár vagyok.',
          },
          {
            scenario: 'You say: I live in Budapest.',
            answer: 'Budapesten élek.',
          },
          {
            scenario: 'You say: I am studying Hungarian now.',
            answer: 'Most magyarul tanulok.',
          },
        ]),
        sessionSize: 4,
        frontLabel: 'Situation',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
]
