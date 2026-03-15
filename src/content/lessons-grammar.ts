import { buildScenarioFlashcardCards, createFlashcardPracticeSet } from './practice-helpers'
import type { Lesson } from './types'

export const grammarLessons: Lesson[] = [
  {
    id: 'articles-and-descriptions',
    trackId: 'core-grammar',
    topics: ['articles', 'descriptions'],
    level: 'A1',
    title: 'Articles and Descriptions',
    subtitle: 'Name simple objects and describe them with one clear adjective.',
    summary:
      'This lesson pulls from Unit 2 object and adjective work so you can handle short questions like Mi ez? and Milyen? in more than one scene, not only as isolated grammar prompts.',
    sourceUnits: ['Unit 2'],
    goals: [
      'Use a and az with simple nouns.',
      'Ask and answer Mi ez? in short object-identification scenes.',
      'Describe a noun with a high-frequency adjective.',
      'Notice how the same object can be named first and described second.',
    ],
    studyFlow: [
      'First name the object with Ez egy..., then add one adjective in a second sentence.',
      'Practice vowel-starting and consonant-starting nouns in separate mini-rounds.',
      'Use the same noun with two different adjectives so the pattern feels reusable.',
      'Read the examples aloud as if you were pointing to real objects around you.',
    ],
    explanations: [
      {
        title: 'a and az',
        body:
          'Hungarian switches between a and az depending on the sound that follows. Az is used before vowel sounds, while a is used before consonant sounds.',
      },
      {
        title: 'Mi ez? / Milyen?',
        body:
          'Mi ez? asks what something is. Milyen? asks what it is like. This is a productive pair for beginner speaking because it lets you move from naming to describing.',
      },
      {
        title: 'Adjective placement',
        body:
          'A short adjective like nagy, kicsi, gyors, or lassú can be added directly to a sentence without extra linking words.',
      },
      {
        title: 'Real scenes are better than word lists',
        body:
          'It is easier to remember these patterns when you attach them to an object in front of you: a car outside, an apple on the table, or a mouse in a picture.',
      },
    ],
    vocabulary: [
      { hungarian: 'autó', english: 'car' },
      { hungarian: 'csiga', english: 'snail' },
      { hungarian: 'egér', english: 'mouse' },
      { hungarian: 'alma', english: 'apple' },
      { hungarian: 'nagy', english: 'big' },
      { hungarian: 'kicsi', english: 'small' },
      { hungarian: 'lassú', english: 'slow' },
      { hungarian: 'gyors', english: 'fast' },
    ],
    examples: [
      {
        hungarian: 'Mi ez? Ez egy autó.',
        english: 'What is this? This is a car.',
        focus: 'Naming an object',
      },
      {
        hungarian: 'Az autó gyors.',
        english: 'The car is fast.',
        focus: 'Article + adjective',
      },
      {
        hungarian: 'A csiga lassú.',
        english: 'The snail is slow.',
        focus: 'Simple description',
      },
      {
        hungarian: 'Ez egy alma. Az alma kicsi.',
        english: 'This is an apple. The apple is small.',
        focus: 'Name first, describe second',
      },
      {
        hungarian: 'Az egér kicsi, de gyors.',
        english: 'The mouse is small but fast.',
        focus: 'Two adjectives in contrast',
      },
      {
        hungarian: 'Milyen az autó? Nagy és gyors.',
        english: 'What is the car like? Big and fast.',
        focus: 'Question + answer pair',
      },
    ],
    practiceSets: [
      {
        id: 'articles-fill',
        type: 'fill',
        title: 'Choose the correct article or adjective',
        instructions:
          'Work with the sentence frame and choose the form that sounds right.',
        questions: [
          {
            id: 'a1',
            prompt: 'Use the article before a vowel-starting noun.',
            template: '___ egér kicsi.',
            choices: ['Az', 'A', 'Egy'],
            answer: 'Az',
            note: 'Az is the natural choice before egér.',
          },
          {
            id: 'a2',
            prompt: 'Describe a snail.',
            template: 'A csiga ___.',
            choices: ['lassú', 'drága', 'gyors'],
            answer: 'lassú',
            note: 'This is a clear beginner adjective pattern.',
          },
          {
            id: 'a3',
            prompt: 'Answer "What is this?"',
            template: 'Ez egy ___.',
            choices: ['autó', 'lassú', 'milyen'],
            answer: 'autó',
            note: 'The answer to Mi ez? needs a noun here.',
          },
          {
            id: 'a4',
            prompt: 'Describe the car in one word.',
            template: 'Az autó ___.',
            choices: ['gyors', 'egér', 'ez'],
            answer: 'gyors',
            note: 'Use an adjective, not another noun.',
          },
          {
            id: 'a5',
            prompt: 'Choose the article before alma.',
            template: '___ alma kicsi.',
            choices: ['Az', 'A', 'Mi'],
            answer: 'Az',
            note: 'Alma starts with a vowel sound, so az is the natural form.',
          },
          {
            id: 'a6',
            prompt: 'Give the answer to Milyen az egér?',
            template: 'Az egér ___.',
            choices: ['kicsi', 'autó', 'ez'],
            answer: 'kicsi',
            note: 'Milyen? asks for description, so answer with an adjective.',
          },
        ],
      },
      {
        id: 'articles-match',
        type: 'match',
        title: 'Match object words to meaning',
        instructions: 'Pair the Hungarian item with its English meaning.',
        pairs: [
          { left: 'autó', right: 'car' },
          { left: 'csiga', right: 'snail' },
          { left: 'egér', right: 'mouse' },
          { left: 'alma', right: 'apple' },
          { left: 'nagy', right: 'big' },
          { left: 'kicsi', right: 'small' },
          { left: 'lassú', right: 'slow' },
          { left: 'gyors', right: 'fast' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'articles-scenario-flashcards',
        title: 'Scenario flashcards for naming and describing',
        instructions:
          'Look at the scene prompt, say the Hungarian sentence, then flip the card.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'You point to a car and say: This is a car.',
            answer: 'Ez egy autó.',
          },
          {
            scenario: 'You describe the car as fast.',
            answer: 'Az autó gyors.',
          },
          {
            scenario: 'You describe the snail as slow.',
            answer: 'A csiga lassú.',
          },
          {
            scenario: 'You point to an apple and say: The apple is small.',
            answer: 'Az alma kicsi.',
          },
          {
            scenario: 'You ask: What is this?',
            answer: 'Mi ez?',
          },
          {
            scenario: 'You ask: What is the mouse like?',
            answer: 'Milyen az egér?',
          },
        ]),
        sessionSize: 6,
        frontLabel: 'Scene',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
  {
    id: 'ban-ben-locations',
    trackId: 'core-grammar',
    topics: ['location', 'present'],
    level: 'A1',
    title: 'Location with -ban / -ben',
    subtitle: 'Talk about being in places and doing simple actions there.',
    summary:
      'Unit 5 introduces a key location pattern. This portal reduces it to reusable daily scenes so you can say who is in a place and what they are doing there.',
    sourceUnits: ['Unit 5'],
    goals: [
      'Recognize the idea of "in" with -ban and -ben.',
      'Choose a location form that fits the noun.',
      'Talk about simple actions happening in a place.',
      'Reuse the same action frame in several everyday locations.',
    ],
    studyFlow: [
      'Learn each location as a chunk: a parkban, a boltban, az étteremben.',
      'Attach one action to every place so the form becomes part of a real sentence.',
      'Run the same sentence with different locations, for example tanul, vásárol, ül, olvas.',
      'Use the examples to imagine a classroom, shop, or restaurant instead of memorizing endings in isolation.',
    ],
    explanations: [
      {
        title: '-ban / -ben',
        body:
          'These endings express "in" or "inside". Which form appears depends on vowel harmony, so the right ending has to be learned together with the noun.',
      },
      {
        title: 'Short action sentences',
        body:
          'A1 conversation often depends on small sentences such as A boltban vásárolok or Az étteremben ülünk. They are simple but very useful.',
      },
      {
        title: 'Chunk learning helps',
        body:
          'Instead of memorizing endings in isolation, store whole combinations like a teremben, a házban, a parkban.',
      },
      {
        title: 'Real location scenes repeat constantly',
        body:
          'You will keep saying where you study, shop, sit, wait, or meet someone. That makes location sentences worth overlearning early.',
      },
    ],
    vocabulary: [
      { hungarian: 'teremben', english: 'in the classroom / hall' },
      { hungarian: 'házban', english: 'in the house' },
      { hungarian: 'parkban', english: 'in the park' },
      { hungarian: 'boltban', english: 'in the shop' },
      { hungarian: 'étteremben', english: 'in the restaurant' },
      { hungarian: 'könyvtárban', english: 'in the library' },
      { hungarian: 'iskolában', english: 'in the school' },
      { hungarian: 'kávézóban', english: 'in the café' },
    ],
    examples: [
      {
        hungarian: 'A diák a teremben tanul.',
        english: 'The student is studying in the classroom.',
        focus: 'Location + action',
      },
      {
        hungarian: 'A nő a boltban vásárol.',
        english: 'The woman is shopping in the store.',
        focus: 'Daily action',
      },
      {
        hungarian: 'A fiú a parkban fut.',
        english: 'The boy is running in the park.',
        focus: 'Movement in place',
      },
      {
        hungarian: 'A férfi az étteremben ül.',
        english: 'The man is sitting in the restaurant.',
        focus: 'Still action in a place',
      },
      {
        hungarian: 'A lány a könyvtárban olvas.',
        english: 'The girl is reading in the library.',
        focus: 'Study scene',
      },
      {
        hungarian: 'A tanár az iskolában dolgozik.',
        english: 'The teacher works in the school.',
        focus: 'Work location',
      },
    ],
    practiceSets: [
      {
        id: 'location-fill',
        type: 'fill',
        title: 'Choose the location form',
        instructions:
          'Pick the correct ending or full place form to complete the sentence.',
        questions: [
          {
            id: 'l1',
            prompt: 'Say that the student is in the classroom.',
            template: 'A diák a ___ tanul.',
            choices: ['teremben', 'teremből', 'teremre'],
            answer: 'teremben',
            note: 'The sentence needs the "in" form here.',
          },
          {
            id: 'l2',
            prompt: 'Choose the right suffix for ház.',
            template: 'A nő a ház___ olvas.',
            choices: ['ban', 'ben', 'ből'],
            answer: 'ban',
            note: 'The full form is házban.',
          },
          {
            id: 'l3',
            prompt: 'Complete the place phrase.',
            template: 'A férfi az ___ ül.',
            choices: ['étteremben', 'étteremig', 'étteremre'],
            answer: 'étteremben',
            note: 'Again, the sentence asks for location inside a place.',
          },
          {
            id: 'l4',
            prompt: 'Say that the girl reads in the library.',
            template: 'A lány a ___ olvas.',
            choices: ['könyvtárban', 'könyvtárból', 'könyvtárra'],
            answer: 'könyvtárban',
            note: 'Store the whole chunk a könyvtárban.',
          },
          {
            id: 'l5',
            prompt: 'Choose the café location form.',
            template: 'A barátom a ___ vár.',
            choices: ['kávézóban', 'kávézóból', 'kávézóra'],
            answer: 'kávézóban',
            note: 'This is a useful meeting-place sentence frame.',
          },
          {
            id: 'l6',
            prompt: 'Say that the teacher works in the school.',
            template: 'A tanár az ___ dolgozik.',
            choices: ['iskolában', 'iskolából', 'iskolára'],
            answer: 'iskolában',
            note: 'Use the location form because the action happens there.',
          },
        ],
      },
      {
        id: 'location-match',
        type: 'match',
        title: 'Match place forms to meaning',
        instructions:
          'Practice ready-made location chunks by matching them directly to English.',
        pairs: [
          { left: 'teremben', right: 'in the classroom' },
          { left: 'házban', right: 'in the house' },
          { left: 'parkban', right: 'in the park' },
          { left: 'boltban', right: 'in the shop' },
          { left: 'étteremben', right: 'in the restaurant' },
          { left: 'könyvtárban', right: 'in the library' },
          { left: 'iskolában', right: 'in the school' },
          { left: 'kávézóban', right: 'in the café' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'location-scenario-flashcards',
        title: 'Scenario flashcards for daily locations',
        instructions:
          'Read the scene and produce the Hungarian location sentence before you flip the card.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'The student is studying in the classroom.',
            answer: 'A diák a teremben tanul.',
          },
          {
            scenario: 'The woman is shopping in the shop.',
            answer: 'A nő a boltban vásárol.',
          },
          {
            scenario: 'The man is sitting in the restaurant.',
            answer: 'A férfi az étteremben ül.',
          },
          {
            scenario: 'The girl is reading in the library.',
            answer: 'A lány a könyvtárban olvas.',
          },
          {
            scenario: 'The teacher works in the school.',
            answer: 'A tanár az iskolában dolgozik.',
          },
          {
            scenario: 'My friend is waiting in the café.',
            answer: 'A barátom a kávézóban vár.',
          },
        ]),
        sessionSize: 6,
        frontLabel: 'Scene',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
  {
    id: 'spatial-relations-scenes',
    trackId: 'core-grammar',
    topics: ['location', 'descriptions'],
    level: 'A1-A2',
    title: 'Spatial Relations in Real Scenes',
    subtitle: 'Use alatt, fölött, mellett, előtt, mögött, and között in everyday descriptions.',
    summary:
      'This lesson turns common postpositions into concrete scenes. Instead of memorizing under, above, and beside as a list, you practice how objects and places move around the same room, street, and home situations.',
    sourceUnits: ['Practical location extension'],
    goals: [
      'Answer Hol van? with common spatial relations.',
      'Contrast similar scene descriptions such as under vs beside and in front of vs behind.',
      'Describe object positions in rooms, streets, and picture-style scenes.',
      'Use van as a stable anchor while the location phrase changes.',
    ],
    studyFlow: [
      'Pick one object pair such as táska and asztal, then cycle it through alatt, mellett, and fölött.',
      'Practice the same room twice with different object positions so the contrast becomes clear.',
      'Say Hol van a... ? out loud before answering with the full scene sentence.',
      'Keep the whole chunk together: az asztal alatt, a ház előtt, az autó mögött.',
      'Return to these scenes later and swap in new nouns without changing the core pattern.',
    ],
    explanations: [
      {
        title: 'Postpositions work best as chunks',
        body:
          'At beginner level it is faster to learn az asztal alatt and a ház előtt as whole phrases than to memorize a translation list and build from zero each time.',
      },
      {
        title: 'Hol van? is the key question',
        body:
          'Most of these scenes grow from one useful question: Hol van? Once that question is stable, the answer pattern can repeat across many different objects.',
      },
      {
        title: 'Meaning comes from contrast',
        body:
          'Under, above, next to, in front of, and behind become clearer when the same object pair is reused. A táska az asztal alatt van feels different from A táska az asztal mellett van because only the location changes.',
      },
      {
        title: 'Use van as the anchor',
        body:
          'Most scene descriptions stay simple with van. That lets you focus on the location phrase itself instead of adding extra grammar at the same time.',
      },
    ],
    vocabulary: [
      { hungarian: 'az asztal alatt', english: 'under the table' },
      { hungarian: 'az asztal fölött', english: 'above the table' },
      { hungarian: 'az asztal mellett', english: 'next to the table' },
      { hungarian: 'a ház előtt', english: 'in front of the house' },
      { hungarian: 'az autó mögött', english: 'behind the car' },
      { hungarian: 'a két fa között', english: 'between the two trees' },
      { hungarian: 'az ágy alatt', english: 'under the bed' },
      { hungarian: 'a könyv mellett', english: 'next to the book' },
    ],
    examples: [
      {
        hungarian: 'A táska az asztal alatt van.',
        english: 'The bag is under the table.',
        focus: 'Under',
      },
      {
        hungarian: 'A lámpa az asztal fölött van.',
        english: 'The lamp is above the table.',
        focus: 'Above',
      },
      {
        hungarian: 'A szék az asztal mellett van.',
        english: 'The chair is next to the table.',
        focus: 'Beside',
      },
      {
        hungarian: 'A taxi a ház előtt van.',
        english: 'The taxi is in front of the house.',
        focus: 'In front of',
      },
      {
        hungarian: 'A bicikli az autó mögött van.',
        english: 'The bicycle is behind the car.',
        focus: 'Behind',
      },
      {
        hungarian: 'A pad a két fa között van.',
        english: 'The bench is between the two trees.',
        focus: 'Between',
      },
      {
        hungarian: 'A telefon a könyv mellett van.',
        english: 'The phone is next to the book.',
        focus: 'Desk scene',
      },
      {
        hungarian: 'Hol van a macska? Az ágy alatt van.',
        english: 'Where is the cat? It is under the bed.',
        focus: 'Question + answer',
      },
    ],
    practiceSets: [
      {
        id: 'spatial-fill',
        type: 'fill',
        title: 'Choose the spatial relation',
        instructions:
          'Pick the relation that matches the scene description best.',
        questions: [
          {
            id: 's1',
            prompt: 'The bag is under the chair.',
            template: 'A táska a szék ___ van.',
            choices: ['alatt', 'fölött', 'mellett'],
            answer: 'alatt',
            note: 'Use alatt for under.',
          },
          {
            id: 's2',
            prompt: 'The lamp is above the table.',
            template: 'A lámpa az asztal ___ van.',
            choices: ['fölött', 'alatt', 'mögött'],
            answer: 'fölött',
            note: 'Use fölött for above.',
          },
          {
            id: 's3',
            prompt: 'The chair is next to the table.',
            template: 'A szék az asztal ___ van.',
            choices: ['mellett', 'előtt', 'között'],
            answer: 'mellett',
            note: 'Mellett means beside or next to.',
          },
          {
            id: 's4',
            prompt: 'The taxi is in front of the house.',
            template: 'A taxi a ház ___ van.',
            choices: ['előtt', 'mögött', 'alatt'],
            answer: 'előtt',
            note: 'Előtt means in front of.',
          },
          {
            id: 's5',
            prompt: 'The bicycle is behind the car.',
            template: 'A bicikli az autó ___ van.',
            choices: ['mögött', 'mellett', 'fölött'],
            answer: 'mögött',
            note: 'Mögött means behind.',
          },
          {
            id: 's6',
            prompt: 'The bench is between the two trees.',
            template: 'A pad a két fa ___ van.',
            choices: ['között', 'előtt', 'alatt'],
            answer: 'között',
            note: 'Között is the between relation.',
          },
          {
            id: 's7',
            prompt: 'The cat is under the bed.',
            template: 'A macska az ágy ___ van.',
            choices: ['alatt', 'mellett', 'fölött'],
            answer: 'alatt',
            note: 'This is a common house scene.',
          },
          {
            id: 's8',
            prompt: 'The picture is above the sofa.',
            template: 'A kép a kanapé ___ van.',
            choices: ['fölött', 'mögött', 'között'],
            answer: 'fölött',
            note: 'Think of wall decoration in a room.',
          },
        ],
      },
      {
        id: 'spatial-scene-fill',
        type: 'fill',
        title: 'Keep the same scene but change the position',
        instructions:
          'These prompts reuse similar rooms and objects so you can feel the difference between the relations.',
        questions: [
          {
            id: 'ss1',
            prompt: 'In the office, the printer is next to the desk.',
            template: 'Az irodában a nyomtató az íróasztal ___ van.',
            choices: ['mellett', 'alatt', 'mögött'],
            answer: 'mellett',
            note: 'Same office scene, different possible positions.',
          },
          {
            id: 'ss2',
            prompt: 'In the bedroom, the shoes are under the bed.',
            template: 'A hálószobában a cipők az ágy ___ vannak.',
            choices: ['alatt', 'előtt', 'fölött'],
            answer: 'alatt',
            note: 'Keep the room image in mind while choosing.',
          },
          {
            id: 'ss3',
            prompt: 'In the street, the bus stop is in front of the pharmacy.',
            template: 'Az utcán a buszmegálló a gyógyszertár ___ van.',
            choices: ['előtt', 'mögött', 'között'],
            answer: 'előtt',
            note: 'Street navigation scenes make these forms more practical.',
          },
          {
            id: 'ss4',
            prompt: 'In the park, the child is between the benches.',
            template: 'A parkban a gyerek a padok ___ van.',
            choices: ['között', 'mellett', 'fölött'],
            answer: 'között',
            note: 'Use the between relation when something is framed by two similar things.',
          },
          {
            id: 'ss5',
            prompt: 'In the kitchen, the clock is above the door.',
            template: 'A konyhában az óra az ajtó ___ van.',
            choices: ['fölött', 'alatt', 'mögött'],
            answer: 'fölött',
            note: 'This is another indoor visual scene.',
          },
          {
            id: 'ss6',
            prompt: 'In the garage, the bike is behind the car.',
            template: 'A garázsban a bicikli az autó ___ van.',
            choices: ['mögött', 'mellett', 'előtt'],
            answer: 'mögött',
            note: 'Behind and beside are easy to confuse unless you reuse the same scene.',
          },
        ],
      },
      {
        id: 'spatial-match',
        type: 'match',
        title: 'Match the spatial chunk to its meaning',
        instructions:
          'Match the full Hungarian chunk to the English meaning or scene role.',
        pairs: [
          { left: 'az asztal alatt', right: 'under the table' },
          { left: 'az asztal fölött', right: 'above the table' },
          { left: 'az asztal mellett', right: 'next to the table' },
          { left: 'a ház előtt', right: 'in front of the house' },
          { left: 'az autó mögött', right: 'behind the car' },
          { left: 'a két fa között', right: 'between the two trees' },
          { left: 'az ágy alatt', right: 'under the bed' },
          { left: 'a könyv mellett', right: 'next to the book' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'spatial-scenario-flashcards',
        title: 'Scenario flashcards for object positions',
        instructions:
          'Read the scene, picture it clearly, and say the Hungarian sentence before you flip the card.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'The bag is under the table.',
            answer: 'A táska az asztal alatt van.',
          },
          {
            scenario: 'The lamp is above the table.',
            answer: 'A lámpa az asztal fölött van.',
          },
          {
            scenario: 'The chair is next to the table.',
            answer: 'A szék az asztal mellett van.',
          },
          {
            scenario: 'The taxi is in front of the house.',
            answer: 'A taxi a ház előtt van.',
          },
          {
            scenario: 'The bicycle is behind the car.',
            answer: 'A bicikli az autó mögött van.',
          },
          {
            scenario: 'The bench is between the two trees.',
            answer: 'A pad a két fa között van.',
          },
          {
            scenario: 'The phone is next to the book.',
            answer: 'A telefon a könyv mellett van.',
          },
          {
            scenario: 'The cat is under the bed.',
            answer: 'A macska az ágy alatt van.',
          },
        ]),
        sessionSize: 8,
        frontLabel: 'Scene',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
]
