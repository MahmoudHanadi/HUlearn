import { buildScenarioFlashcardCards, createFlashcardPracticeSet } from './practice-helpers'
import type { Lesson } from './types'

export const conversationLessons: Lesson[] = [
  {
    id: 'greetings-and-thanks',
    trackId: 'core-conversation',
    topics: ['greetings', 'politeness'],
    level: 'A1',
    title: 'Greetings and Thanks',
    subtitle: 'Handle short openings, thanks, and farewells naturally.',
    summary:
      'This portal now trains greetings through real settings: friends, cafés, reception desks, evening arrivals, and bedtime goodbyes. The goal is not just memorizing phrases, but choosing the right phrase for the right person, place, and time.',
    sourceUnits: ['Unit 1'],
    goals: [
      'Choose a greeting that matches the time of day.',
      'Switch between informal and polite register without mixing them.',
      'Reply to thanks naturally in both casual and service situations.',
      'Close short exchanges with a goodbye that fits the setting.',
    ],
    studyFlow: [
      'Practice greetings by time block first: morning, daytime, evening, then good night.',
      'Split friend scenarios and service scenarios so Szia and Jó napot kívánok do not blur together.',
      'Repeat one fixed thanks exchange until it becomes automatic: Köszönöm szépen. Szívesen.',
      'Run the same scene twice with different register choices, for example friend vs receptionist.',
      'Read the mini-dialogue examples aloud and imagine the place where they happen.',
      'Finish with one fast scenario round where you answer without translating into English.',
    ],
    explanations: [
      {
        title: 'Time-based greetings',
        body:
          'Hungarian often uses fixed greetings for morning, daytime, and evening. Jó éjszakát is different: it means good night and is used when someone is going to sleep or turning in, not as a general hello.',
        tips: [
          'Jó reggelt = morning',
          'Jó napot kívánok = daytime / polite',
          'Jó estét = evening',
          'Jó éjszakát = good night',
        ],
      },
      {
        title: 'Informal vs polite register',
        body:
          'Szia, Helló, and Köszi are informal and work with friends, classmates, and familiar contacts. Jó napot kívánok, Köszönöm szépen, and Viszontlátásra are safer with strangers, staff, or officials.',
      },
      {
        title: 'Greeting and goodbye can be different choices',
        body:
          'A phrase that works when you arrive may not be the best phrase when you leave. Szia can work as hi and bye informally, but Jó estét is an opening greeting while Viszlát or Viszontlátásra are closings.',
      },
      {
        title: 'Replying to thanks',
        body:
          'Szívesen, Nincs mit, and Nagyon szívesen are all natural replies to thank you. Start with one short default answer, then add the others once the timing feels automatic.',
      },
      {
        title: 'Service situations need safer defaults',
        body:
          'When you are unsure, polite daytime language is usually safer with receptionists, cashiers, office staff, doctors, and older strangers. You can become more casual later if the interaction clearly invites it.',
      },
      {
        title: 'Learn the scene, not only the translation',
        body:
          'Instead of memorizing a phrase as an isolated translation, attach it to a concrete scene: entering a clinic, thanking a waiter, texting a friend, or saying good night at home.',
      },
    ],
    vocabulary: [
      { hungarian: 'Szia', english: 'Hi / Bye', note: 'informal' },
      { hungarian: 'Helló', english: 'Hello', note: 'informal / neutral' },
      { hungarian: 'Jó reggelt', english: 'Good morning' },
      { hungarian: 'Jó napot kívánok', english: 'Good day / Good afternoon', note: 'polite' },
      { hungarian: 'Jó estét', english: 'Good evening' },
      { hungarian: 'Jó éjszakát', english: 'Good night' },
      { hungarian: 'Köszi', english: 'Thanks', note: 'informal' },
      { hungarian: 'Köszönöm', english: 'Thank you' },
      { hungarian: 'Köszönöm szépen', english: 'Thank you very much', note: 'polite / common' },
      { hungarian: 'Szívesen', english: 'You are welcome' },
      { hungarian: 'Nincs mit', english: 'No problem / You are welcome' },
      { hungarian: 'Viszlát', english: 'Goodbye', note: 'neutral / common' },
      { hungarian: 'Viszontlátásra', english: 'Goodbye', note: 'more formal' },
    ],
    examples: [
      {
        hungarian: 'Szia, Zsófi! Hogy vagy?',
        english: 'Hi, Zsófi. How are you?',
        focus: 'Friend greeting',
      },
      {
        hungarian: 'Jó reggelt! Egy kávét kérek.',
        english: 'Good morning. I would like a coffee.',
        focus: 'Morning café opening',
      },
      {
        hungarian: 'Jó napot kívánok! Egy időpontot szeretnék.',
        english: 'Good afternoon. I would like an appointment.',
        focus: 'Reception or office setting',
      },
      {
        hungarian: 'Jó estét! Van még szabad asztal?',
        english: 'Good evening. Do you still have a free table?',
        focus: 'Restaurant arrival',
      },
      {
        hungarian: 'Köszi a segítséget! Szívesen.',
        english: 'Thanks for the help. You are welcome.',
        focus: 'Casual thanks exchange',
      },
      {
        hungarian: 'Köszönöm szépen. Nagyon szívesen.',
        english: 'Thank you very much. You are very welcome.',
        focus: 'Polite thanks exchange',
      },
      {
        hungarian: 'Köszönöm. Viszontlátásra!',
        english: 'Thank you. Goodbye.',
        focus: 'Formal closing',
      },
      {
        hungarian: 'Jó éjszakát! Holnap beszélünk.',
        english: 'Good night. We will talk tomorrow.',
        focus: 'Bedtime goodbye',
      },
    ],
    practiceSets: [
      {
        id: 'greetings-fill',
        type: 'fill',
        title: 'Pick the phrase that fits the situation',
        instructions:
          'Read the situation and choose the greeting, thanks reply, or goodbye that best fits the person, setting, and time of day.',
        questions: [
          {
            id: 'g1',
            prompt: 'It is 7:15 in the morning and you greet a classmate.',
            template: '___! Hogy vagy?',
            choices: ['Jó reggelt', 'Jó estét', 'Jó éjszakát'],
            answer: 'Jó reggelt',
            note: 'Morning greeting first, then the rest of the exchange.',
          },
          {
            id: 'g2',
            prompt: 'You greet a receptionist politely at 10:00.',
            template: '___!',
            choices: ['Jó napot kívánok', 'Szia', 'Köszi'],
            answer: 'Jó napot kívánok',
            note: 'This is the safe daytime opening in formal or service settings.',
          },
          {
            id: 'g3',
            prompt: 'A friend messages you to say hello.',
            template: '___! Mi újság?',
            choices: ['Szia', 'Viszontlátásra', 'Jó éjszakát'],
            answer: 'Szia',
            note: 'Keep the interaction light and informal here.',
          },
          {
            id: 'g4',
            prompt: 'You arrive at a restaurant in the evening.',
            template: '___! Van még szabad asztal?',
            choices: ['Jó estét', 'Jó reggelt', 'Nincs mit'],
            answer: 'Jó estét',
            note: 'Use the evening greeting when arriving, not when leaving.',
          },
          {
            id: 'g5',
            prompt: 'Reply to a thank-you after you hold the door.',
            template: '- Köszönöm! - ___.',
            choices: ['Szívesen', 'Jó estét', 'Viszlát'],
            answer: 'Szívesen',
            note: 'Szívesen is the shortest natural default reply.',
          },
          {
            id: 'g6',
            prompt: 'Reply casually when a friend thanks you for notes from class.',
            template: '- Köszi! - ___.',
            choices: ['Nincs mit', 'Jó reggelt', 'Jó éjszakát'],
            answer: 'Nincs mit',
            note: 'Nincs mit works well in casual daily interactions.',
          },
          {
            id: 'g7',
            prompt: 'You are leaving a clinic or office after a polite conversation.',
            template: 'Köszönöm szépen. ___!',
            choices: ['Viszontlátásra', 'Szia', 'Helló'],
            answer: 'Viszontlátásra',
            note: 'This closing sounds more formal than Viszlát.',
          },
          {
            id: 'g8',
            prompt: 'You are leaving a neighborhood shop after paying.',
            template: 'Köszönöm. ___!',
            choices: ['Viszlát', 'Jó napot kívánok', 'Jó éjszakát'],
            answer: 'Viszlát',
            note: 'Viszlát is a safe neutral goodbye in common service encounters.',
          },
          {
            id: 'g9',
            prompt: 'Someone is going to bed and you want to wish them well.',
            template: '___!',
            choices: ['Jó éjszakát', 'Jó napot kívánok', 'Helló'],
            answer: 'Jó éjszakát',
            note: 'This is a bedtime wish, not a general hello.',
          },
          {
            id: 'g10',
            prompt: 'Thank a close friend for quick help.',
            template: '___ a segítséget!',
            choices: ['Köszi', 'Viszontlátásra', 'Szívesen'],
            answer: 'Köszi',
            note: 'Use the informal thanks word with friends.',
          },
        ],
      },
      {
        id: 'greetings-register-fill',
        type: 'fill',
        title: 'Choose the register that matches the setting',
        instructions:
          'The same basic function can sound casual or polite. Choose the phrase that matches the setting best.',
        questions: [
          {
            id: 'gr1',
            prompt: 'You greet your teacher in the school corridor.',
            template: '___!',
            choices: ['Jó napot kívánok', 'Szia', 'Köszi'],
            answer: 'Jó napot kívánok',
            note: 'Teacher plus corridor usually calls for the safer polite register.',
          },
          {
            id: 'gr2',
            prompt: 'You greet your close friend when they arrive.',
            template: '___!',
            choices: ['Szia', 'Viszontlátásra', 'Jó éjszakát'],
            answer: 'Szia',
            note: 'No need to sound formal in a casual friend setting.',
          },
          {
            id: 'gr3',
            prompt: 'You thank a cashier after getting your change.',
            template: '___ .',
            choices: ['Köszönöm szépen', 'Helló', 'Jó estét'],
            answer: 'Köszönöm szépen',
            note: 'Use the polite thank-you in service interactions.',
          },
          {
            id: 'gr4',
            prompt: 'You reply politely to a customer who thanked you.',
            template: '___ .',
            choices: ['Nagyon szívesen', 'Szia', 'Jó reggelt'],
            answer: 'Nagyon szívesen',
            note: 'This is a strong polite reply in service or formal contexts.',
          },
          {
            id: 'gr5',
            prompt: 'You leave a friend after a short chat in the street.',
            template: '___!',
            choices: ['Szia', 'Jó napot kívánok', 'Jó estét'],
            answer: 'Szia',
            note: 'Szia works as goodbye in informal speech too.',
          },
          {
            id: 'gr6',
            prompt: 'You leave a government office after finishing paperwork.',
            template: '___!',
            choices: ['Viszontlátásra', 'Helló', 'Köszi'],
            answer: 'Viszontlátásra',
            note: 'Formal closing fits the setting better than the casual options.',
          },
          {
            id: 'gr7',
            prompt: 'It is late evening and you greet the waiter as you arrive.',
            template: '___!',
            choices: ['Jó estét', 'Jó reggelt', 'Jó éjszakát'],
            answer: 'Jó estét',
            note: 'Use the evening greeting for arrival, not good night.',
          },
          {
            id: 'gr8',
            prompt: 'Your child is heading to bed and you say goodbye for the night.',
            template: '___!',
            choices: ['Jó éjszakát', 'Viszlát', 'Helló'],
            answer: 'Jó éjszakát',
            note: 'The setting makes this a true good-night scene.',
          },
        ],
      },
      {
        id: 'greetings-match',
        type: 'match',
        title: 'Match the phrase to the real-life use',
        instructions:
          'Match each Hungarian phrase to the meaning or usage description that fits it best.',
        pairs: [
          { left: 'Szia', right: 'informal hi / bye with a friend' },
          { left: 'Helló', right: 'hello in a casual or neutral setting' },
          { left: 'Jó reggelt', right: 'good morning' },
          { left: 'Jó napot kívánok', right: 'polite daytime greeting' },
          { left: 'Jó estét', right: 'evening greeting when arriving' },
          { left: 'Jó éjszakát', right: 'good night before sleep' },
          { left: 'Köszönöm szépen', right: 'polite thank you very much' },
          { left: 'Szívesen', right: 'default reply to thank you' },
          { left: 'Nincs mit', right: 'casual no problem / you are welcome' },
          { left: 'Viszontlátásra', right: 'formal goodbye when leaving' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'greetings-scenario-flashcards',
        title: 'Scenario flashcards for greetings and thanks',
        instructions:
          'Read the situation, say the Hungarian phrase out loud, then flip the card and check whether your choice fits the scene.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'It is 8:00 a.m. You greet a coworker in the office kitchen.',
            answer: 'Jó reggelt!',
            note: 'Morning situation.',
          },
          {
            scenario: 'You walk up to a receptionist at midday and want to open politely.',
            answer: 'Jó napot kívánok!',
            note: 'Safe polite daytime choice.',
          },
          {
            scenario: 'A friend arrives at your place and you greet them casually.',
            answer: 'Szia!',
            note: 'Informal friend setting.',
          },
          {
            scenario: 'You enter a restaurant in the evening.',
            answer: 'Jó estét!',
            note: 'Evening arrival.',
          },
          {
            scenario: 'A friend thanks you for your help with homework.',
            answer: 'Nincs mit.',
            note: 'Casual reply to thanks.',
          },
          {
            scenario: 'A customer thanks you at work and you want a more polite reply.',
            answer: 'Nagyon szívesen.',
            note: 'Polite service reply.',
          },
          {
            scenario: 'You leave a shop after paying and want a normal goodbye.',
            answer: 'Viszlát!',
            note: 'Common neutral closing.',
          },
          {
            scenario: 'You leave an office or clinic and want the more formal goodbye.',
            answer: 'Viszontlátásra!',
            note: 'Formal closing.',
          },
          {
            scenario: 'Someone is going to sleep and you want to say good night.',
            answer: 'Jó éjszakát!',
            note: 'Use for bedtime, not first contact.',
          },
          {
            scenario: 'You want to thank a close friend quickly and casually.',
            answer: 'Köszi!',
            note: 'Informal thanks.',
          },
        ]),
        sessionSize: 10,
        frontLabel: 'Situation',
        backLabel: 'Best Hungarian phrase',
      }),
    ],
  },
  {
    id: 'nationality-and-origin',
    trackId: 'core-conversation',
    topics: ['nationality', 'origin', 'introductions'],
    level: 'A1',
    title: 'Nationality and Origin',
    subtitle: 'Say where you are from and who you are.',
    summary:
      'Adapted from Unit 2, this lesson gives you the core patterns for country, nationality, and simple identity statements.',
    sourceUnits: ['Unit 2'],
    goals: [
      'Ask where someone is from.',
      'Answer with a country or nationality.',
      'Use vagyok and vagy in short identity statements.',
    ],
    explanations: [
      {
        title: 'Talking about origin',
        body:
          'The question Honnan jöttél? asks where someone came from. In beginner conversation it often works like "Where are you from?"',
      },
      {
        title: 'Nationality words',
        body:
          'Nationality words often appear as adjectives in Hungarian. Magyar, lengyel, and német can describe a person directly.',
      },
      {
        title: 'Identity with lenni',
        body:
          'Vagyok means "I am" and vagy means "you are" in the informal singular. These are essential forms for self-introduction.',
      },
    ],
    vocabulary: [
      { hungarian: 'magyar', english: 'Hungarian' },
      { hungarian: 'lengyel', english: 'Polish' },
      { hungarian: 'német', english: 'German' },
      { hungarian: 'Magyarország', english: 'Hungary' },
      { hungarian: 'Finnország', english: 'Finland' },
      { hungarian: 'Honnan jöttél?', english: 'Where are you from?' },
    ],
    examples: [
      {
        hungarian: 'Magyar vagyok.',
        english: 'I am Hungarian.',
        focus: 'Identity statement',
      },
      {
        hungarian: 'Lengyel diák vagy?',
        english: 'Are you a Polish student?',
        focus: 'Informal question',
      },
      {
        hungarian: 'Finnországból jöttem.',
        english: 'I came from Finland / I am from Finland.',
        focus: 'Origin statement',
      },
    ],
    practiceSets: [
      {
        id: 'origin-fill',
        type: 'fill',
        title: 'Complete the identity pattern',
        instructions:
          'Choose the word that completes each core introduction sentence.',
        questions: [
          {
            id: 'o1',
            prompt: 'Say "I am Hungarian."',
            template: 'Magyar ___.',
            choices: ['vagyok', 'vagy', 'van'],
            answer: 'vagyok',
            note: 'Use vagyok with én, even when the pronoun itself is omitted.',
          },
          {
            id: 'o2',
            prompt: 'Ask "Are you Polish?" informally.',
            template: 'Lengyel ___?',
            choices: ['vagy', 'vagyok', 'van'],
            answer: 'vagy',
            note: 'The second person singular form here is vagy.',
          },
          {
            id: 'o3',
            prompt: 'Say that you are from Hungary.',
            template: '___ jöttem.',
            choices: ['Magyarországból', 'Magyarországban', 'Magyarországra'],
            answer: 'Magyarországból',
            note: 'The ending here marks movement or origin "from".',
          },
        ],
      },
      {
        id: 'origin-match',
        type: 'match',
        title: 'Match countries and meanings',
        instructions:
          'Practice country and nationality vocabulary by matching Hungarian to English.',
        pairs: [
          { left: 'magyar', right: 'Hungarian' },
          { left: 'német', right: 'German' },
          { left: 'lengyel', right: 'Polish' },
          { left: 'Magyarország', right: 'Hungary' },
          { left: 'Finnország', right: 'Finland' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'origin-scenario-flashcards',
        title: 'Scenario flashcards for introductions',
        instructions:
          'Read the situation and produce the short identity or origin sentence before you flip the card.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'You introduce yourself and say: I am Hungarian.',
            answer: 'Magyar vagyok.',
          },
          {
            scenario: 'You ask a friend informally: Are you Polish?',
            answer: 'Lengyel vagy?',
          },
          {
            scenario: 'You answer: I am from Finland.',
            answer: 'Finnországból jöttem.',
          },
          {
            scenario: 'You ask someone: Where are you from?',
            answer: 'Honnan jöttél?',
          },
        ]),
        sessionSize: 4,
        frontLabel: 'Situation',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
  {
    id: 'cafe-and-prices',
    trackId: 'core-conversation',
    topics: ['shopping', 'prices'],
    level: 'A1',
    title: 'Cafe Orders and Prices',
    subtitle: 'Ask for items and understand simple price exchanges.',
    summary:
      'Unit 3 introduces practical café and shop language. This portal keeps the useful patterns and strips them into short repeatable drills.',
    sourceUnits: ['Unit 3'],
    goals: [
      'Order a drink or snack politely.',
      'Ask how much something costs.',
      'Recognize a basic price answer.',
    ],
    explanations: [
      {
        title: 'Kérek + noun',
        body:
          'Kérek is a very common polite way to ask for something. It is one of the first forms worth memorizing as a chunk.',
      },
      {
        title: 'Mennyibe kerül?',
        body:
          'Use Mennyibe kerül? to ask "How much does it cost?" It is one of the highest-value phrases for daily survival Hungarian.',
      },
      {
        title: 'Price answers',
        body:
          'Price answers often come as a number plus forint. Even partial comprehension here is enough to keep a transaction moving.',
      },
    ],
    vocabulary: [
      { hungarian: 'kávé', english: 'coffee' },
      { hungarian: 'tea', english: 'tea' },
      { hungarian: 'kóla', english: 'cola' },
      { hungarian: 'pogácsa', english: 'savory pastry' },
      { hungarian: 'szendvics', english: 'sandwich' },
      { hungarian: 'forint', english: 'forint' },
    ],
    examples: [
      {
        hungarian: 'Kérek egy kávét.',
        english: 'I would like a coffee.',
        focus: 'Polite ordering',
      },
      {
        hungarian: 'Mennyibe kerül a tea?',
        english: 'How much is the tea?',
        focus: 'Price question',
      },
      {
        hungarian: 'A tea kétszáz forint.',
        english: 'The tea is two hundred forints.',
        focus: 'Simple price answer',
      },
    ],
    practiceSets: [
      {
        id: 'cafe-fill',
        type: 'fill',
        title: 'Build a short ordering exchange',
        instructions:
          'Choose the option that keeps the café exchange natural and complete.',
        questions: [
          {
            id: 'c1',
            prompt: 'Order a coffee politely.',
            template: '___ egy kávét.',
            choices: ['Kérek', 'Kéred', 'Kér'],
            answer: 'Kérek',
            note: 'This chunk is worth repeating until it feels automatic.',
          },
          {
            id: 'c2',
            prompt: 'Ask for the price.',
            template: '___ kerül a tea?',
            choices: ['Mennyibe', 'Milyen', 'Honnan'],
            answer: 'Mennyibe',
            note: 'The full phrase Mennyibe kerül is a fixed pattern.',
          },
          {
            id: 'c3',
            prompt: 'Complete the price answer.',
            template: 'A kóla háromszáz ___.',
            choices: ['forint', 'óra', 'reggelt'],
            answer: 'forint',
            note: 'For beginner practice, number + forint is enough.',
          },
        ],
      },
      {
        id: 'cafe-match',
        type: 'match',
        title: 'Match cafe vocabulary to meaning',
        instructions:
          'Pair the common shop and café items with their English meanings.',
        pairs: [
          { left: 'kávé', right: 'coffee' },
          { left: 'tea', right: 'tea' },
          { left: 'kóla', right: 'cola' },
          { left: 'pogácsa', right: 'savory pastry' },
          { left: 'szendvics', right: 'sandwich' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'cafe-scenario-flashcards',
        title: 'Scenario flashcards for ordering and paying',
        instructions:
          'Say the useful sentence for the café situation before you flip the card.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'You want to order a coffee politely.',
            answer: 'Kérek egy kávét.',
          },
          {
            scenario: 'You ask how much the tea costs.',
            answer: 'Mennyibe kerül a tea?',
          },
          {
            scenario: 'You say: The cola is three hundred forints.',
            answer: 'A kóla háromszáz forint.',
          },
          {
            scenario: 'You order a sandwich politely.',
            answer: 'Kérek egy szendvicset.',
          },
        ]),
        sessionSize: 4,
        frontLabel: 'Situation',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
]
