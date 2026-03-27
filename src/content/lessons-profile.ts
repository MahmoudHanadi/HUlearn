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
    studyFlow: [
      'Read the three profile patterns first: age, profession, and one present-tense action.',
      'Say the example self-introductions aloud before you start the guided practice.',
      'Use the fill practice to lock in the core chunks, then switch to matching and scenario flashcards.',
      'Finish by saying your own short profile from memory with one fact, one role, and one action.',
    ],
    explanations: [
      {
        title: 'Age pattern',
        body:
          'Hungarian commonly uses number + éves vagyok to state age. It works as a full chunk and is worth memorizing exactly that way.',
        tables: [
          {
            title: 'Age pattern across persons',
            columns: ['Person', 'Pattern'],
            rows: [
              ['(Én)', 'harminchárom éves vagyok'],
              ['(Te)', 'harminchárom éves vagy'],
              ['(Ő)', 'harminchárom éves'],
            ],
            note:
              'In simple beginner drills, the third-person line often appears without an extra verb after éves.',
          },
        ],
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
      {
        title: 'Ask the age directly',
        body:
          'A very common question is Hány éves vagy? Once you know that question, you can answer with your own age and also understand the matching forms with te and ő.',
      },
    ],
    vocabulary: [
      { hungarian: 'éves vagyok', english: 'I am ... years old' },
      { hungarian: 'Hány éves vagy?', english: 'How old are you?' },
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
      {
        hungarian: 'Hány éves vagy? Huszonhat éves vagyok.',
        english: 'How old are you? I am twenty-six years old.',
        focus: 'Age question and answer',
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
          {
            id: 'p4',
            prompt: 'Ask a friend about age.',
            template: 'Hány ___ vagy?',
            choices: ['éves', 'forint', 'szia'],
            answer: 'éves',
            note: 'This is the direct beginner question for age.',
          },
          {
            id: 'p5',
            prompt: 'Say: you are thirty-three years old.',
            template: 'Harminchárom éves ___ .',
            choices: ['vagy', 'vagyok', 'van'],
            answer: 'vagy',
            note: 'Switch from vagyok to vagy when the subject is te.',
          },
          {
            id: 'p6',
            prompt: 'Answer the age question about yourself.',
            template: '- Hány éves vagy? - Huszonhat ___ .',
            choices: ['éves vagyok', 'vagy', 'éves'],
            answer: 'éves vagyok',
            note: 'The answer keeps the full first-person age chunk.',
          },
          {
            id: 'p7',
            prompt: 'Correct someone’s guess about your age.',
            template: 'Nem, én csak huszonkét éves ___ .',
            choices: ['vagyok', 'vagy', 'van'],
            answer: 'vagyok',
            note: 'This follows the workbook’s age-correction dialogue pattern.',
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
          { left: 'Hány éves vagy?', right: 'How old are you?' },
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
          {
            scenario: 'You ask a friend: How old are you?',
            answer: 'Hány éves vagy?',
          },
          {
            scenario: 'You answer: I am twenty-six years old.',
            answer: 'Huszonhat éves vagyok.',
          },
        ]),
        sessionSize: 6,
        frontLabel: 'Situation',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
]
