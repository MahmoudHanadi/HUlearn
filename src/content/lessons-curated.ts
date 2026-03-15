import { buildScenarioFlashcardCards, createFlashcardPracticeSet } from './practice-helpers'
import type { Lesson } from './types'

export const curatedLessons: Lesson[] = [
  {
    id: 'curated-alphabet-sound-map',
    trackId: 'curated-learning',
    topics: ['alphabet', 'pronunciation', 'speaking'],
    level: '0 -> A1',
    phase: 'Bootcamp',
    sequence: 1,
    title: 'Alphabet and Sound Map',
    subtitle: 'Build a reliable pronunciation base before chasing grammar.',
    summary:
      'This starter lesson turns the alphabet into a usable sound map: long vs short vowels, the most common digraphs, and the reading habits that stop fossilized pronunciation errors early.',
    sourceUnits: ['Reddit step 1', 'Alphabet guide'],
    goals: [
      'Hear and pronounce the most important Hungarian vowel contrasts.',
      'Recognize digraphs and trigraphs as single sounds.',
      'Read names and core beginner words aloud with less hesitation.',
    ],
    studyFlow: [
      'Read the alphabet guide once for overview, then replay only the sounds that feel unstable.',
      'Shadow short word pairs aloud and exaggerate long vowels so the contrast becomes physical.',
      'Record yourself reading the examples and compare them against a native audio source such as Forvo.',
      'Keep a running list of problem sounds and recycle them before every later lesson.',
    ],
    resources: [
      {
        title: 'Reddit guide thread',
        url: 'https://www.reddit.com/r/hungarian/comments/lg36p9/an_ultimate_guide_to_learning_hungarian_10_steps/',
        note: 'Use the overall sequence as the path logic for the full section.',
      },
      {
        title: 'Catch Budapest alphabet guide',
        url: 'https://www.catchbudapest.com/hungarian-alphabet/',
        note: 'Primary source for pronunciation setup and letter patterns.',
      },
      {
        title: 'Forvo pronunciation dictionary',
        url: 'https://forvo.com/languages/hu/',
        note: 'Check native pronunciation for words you want to shadow repeatedly.',
      },
    ],
    explanations: [
      {
        title: 'Length changes meaning',
        body:
          'Hungarian vowel length is not decorative. Short and long vowels can separate words, so beginners should train them as distinct targets from the start.',
        tips: [
          'Treat a / á, e / é, and o / ó as separate sounds, not as relaxed variants.',
          'Stretch long vowels clearly while practicing, then reduce exaggeration later.',
        ],
      },
      {
        title: 'Letter groups act like one sound',
        body:
          'Common spellings such as cs, sz, zs, gy, ny, and ty should be read as fixed sound units. Seeing them as single chunks makes reading much faster.',
      },
      {
        title: 'Accuracy beats speed here',
        body:
          'The goal is not fast reading yet. A slow, accurate sound map now will make later listening, spelling, and vocabulary review easier.',
      },
    ],
    vocabulary: [
      { hungarian: 'szia', english: 'hi / bye', note: 'sz sounds like English s' },
      { hungarian: 'család', english: 'family', note: 'cs sounds like English ch' },
      { hungarian: 'gyerek', english: 'child', note: 'practice gy as a single unit' },
      { hungarian: 'kávé', english: 'coffee', note: 'long á matters' },
      { hungarian: 'szép', english: 'beautiful / nice', note: 'long é matters' },
      { hungarian: 'Budapest', english: 'Budapest', note: 'use it as a first read-aloud anchor' },
    ],
    examples: [
      {
        hungarian: 'Szia! Kávét kérek.',
        english: 'Hi. I would like a coffee.',
        focus: 'sz + long á',
      },
      {
        hungarian: 'A család Budapesten él.',
        english: 'The family lives in Budapest.',
        focus: 'cs + long vowels',
      },
      {
        hungarian: 'Egy gyerek itt van.',
        english: 'A child is here.',
        focus: 'gy + egy',
      },
    ],
    practiceSets: [
      {
        id: 'curated-alphabet-fill',
        type: 'fill',
        title: 'Complete the sound chunk',
        instructions:
          'Choose the missing letters or sound unit that completes the common beginner word.',
        questions: [
          {
            id: 'ca1',
            prompt: 'Complete the informal greeting.',
            template: '___ia',
            choices: ['Sz', 'Cs', 'Gy'],
            answer: 'Sz',
            note: 'Szia starts with sz, the Hungarian s sound.',
          },
          {
            id: 'ca2',
            prompt: 'Build the word for coffee.',
            template: 'k___vé',
            choices: ['á', 'a', 'e'],
            answer: 'á',
            note: 'Length matters here: kávé needs long á.',
          },
          {
            id: 'ca3',
            prompt: 'Complete the word for child.',
            template: '___erek',
            choices: ['gy', 'ny', 'ty'],
            answer: 'gy',
            note: 'Read gy as one unit, not as two separate letters.',
          },
        ],
      },
      {
        id: 'curated-alphabet-match',
        type: 'match',
        title: 'Match sound-heavy words to meaning',
        instructions:
          'Use a small set of common words to reinforce the sound groups you just studied.',
        pairs: [
          { left: 'szia', right: 'hi / bye' },
          { left: 'család', right: 'family' },
          { left: 'gyerek', right: 'child' },
          { left: 'kávé', right: 'coffee' },
          { left: 'szép', right: 'beautiful / nice' },
        ],
      },
    ],
  },
  {
    id: 'curated-numbers-dates-time',
    trackId: 'curated-learning',
    topics: ['numbers', 'time', 'speaking'],
    level: '0 -> A1',
    phase: 'Bootcamp',
    sequence: 2,
    title: 'Numbers, Dates, and Time',
    subtitle: 'Use numbers for prices, clocks, dates, and fast practical exchanges.',
    summary:
      'This lesson follows the curriculum rule to front-load numbers early. You will use them in prices, appointments, dates, phone numbers, and daily logistics long before you can handle complex grammar.',
    sourceUnits: ['Reddit step 4', 'Numbers guide'],
    goals: [
      'Count with confidence through common shopping and time ranges.',
      'Recognize prices and basic phone or address numbers.',
      'Say the date and tell simple clock time.',
    ],
    studyFlow: [
      'Study the number patterns in chunks rather than as isolated items.',
      'Drill prices, dates, and times aloud every day for a few minutes.',
      'Use the Foreign Numbers app or a similar drill tool to force quick listening recognition.',
      'Recycle numbers inside later speaking lessons instead of treating them as a separate topic.',
    ],
    resources: [
      {
        title: 'Catch Budapest numbers guide',
        url: 'https://www.catchbudapest.com/hungarian-numbers/',
        note: 'Core reference for number forms and practical uses.',
      },
      {
        title: 'Foreign Numbers',
        url: 'https://foreignnumbers.com/',
        note: 'Quick listening drills for prices, dates, and number recognition.',
      },
      {
        title: 'Reddit guide thread',
        url: 'https://www.reddit.com/r/hungarian/comments/lg36p9/an_ultimate_guide_to_learning_hungarian_10_steps/',
        note: 'Reinforces why numbers should be tackled early instead of postponed.',
      },
    ],
    explanations: [
      {
        title: 'Numbers are a survival tool',
        body:
          'Even a low-level learner needs numbers for shopping, transport, appointments, and identity details. This is why the curriculum brings them forward immediately.',
      },
      {
        title: 'Learn in real formats',
        body:
          'Do not stop at counting 1 to 10. Practice phone numbers, prices, dates, and clock time because those are the forms you will actually hear.',
      },
      {
        title: 'Speed matters more than translation',
        body:
          'The key skill is rapid recognition. You want to hear a number and respond before mentally translating every part into English.',
      },
    ],
    vocabulary: [
      { hungarian: 'egy', english: 'one' },
      { hungarian: 'kettő', english: 'two' },
      { hungarian: 'tíz', english: 'ten' },
      { hungarian: 'száz', english: 'hundred' },
      { hungarian: 'óra', english: 'hour / o’clock' },
      { hungarian: 'forint', english: 'forint' },
    ],
    examples: [
      {
        hungarian: 'Két kávé, háromszáz forint.',
        english: 'Two coffees, three hundred forints.',
        focus: 'Price pattern',
      },
      {
        hungarian: 'Ma március tizenötödike van.',
        english: 'Today is March fifteenth.',
        focus: 'Date pattern',
      },
      {
        hungarian: 'Hat óra van.',
        english: 'It is six o’clock.',
        focus: 'Clock time',
      },
    ],
    practiceSets: [
      {
        id: 'curated-numbers-fill',
        type: 'fill',
        title: 'Complete the practical number phrase',
        instructions:
          'Choose the word that best completes each price, date, or time pattern.',
        questions: [
          {
            id: 'cn1',
            prompt: 'Complete the price phrase.',
            template: 'Kétszáz ___.',
            choices: ['forint', 'óra', 'kávé'],
            answer: 'forint',
            note: 'For beginner survival speech, number + forint is a high-value chunk.',
          },
          {
            id: 'cn2',
            prompt: 'Tell the time.',
            template: 'Három ___ van.',
            choices: ['óra', 'ember', 'napot'],
            answer: 'óra',
            note: 'This is the basic clock pattern for simple time statements.',
          },
          {
            id: 'cn3',
            prompt: 'Complete the counting sentence.',
            template: 'Kettő meg öt az ___.',
            choices: ['hét', 'hat', 'tíz'],
            answer: 'hét',
            note: 'Use a small spoken math pattern to make the number automatic.',
          },
        ],
      },
      {
        id: 'curated-numbers-match',
        type: 'match',
        title: 'Match number words to meaning',
        instructions:
          'Match the practical number and time words you will reuse in later lessons.',
        pairs: [
          { left: 'egy', right: 'one' },
          { left: 'kettő', right: 'two' },
          { left: 'tíz', right: 'ten' },
          { left: 'száz', right: 'hundred' },
          { left: 'óra', right: 'hour / o’clock' },
        ],
      },
    ],
  },
  {
    id: 'curated-first-script-survival-phrases',
    trackId: 'curated-learning',
    topics: ['scripts', 'introductions', 'speaking'],
    level: 'A1',
    phase: 'A1 Foundations',
    sequence: 3,
    title: 'First Script and Survival Phrases',
    subtitle: 'Build a first personal script instead of waiting for “free” conversation.',
    summary:
      'This lesson follows the curriculum’s script-first principle. You will build a short, personal introduction with useful fixed phrases for greeting, origin, language ability, and basic follow-up questions.',
    sourceUnits: ['Reddit step 7', 'Phrasebook path'],
    goals: [
      'Memorize a 60 to 90 second self-introduction script.',
      'Ask and answer simple origin and language questions.',
      'Use a handful of high-frequency chunks automatically.',
    ],
    studyFlow: [
      'Write a short self-introduction in English first, then reduce it to simple Hungarian chunks.',
      'Keep the first script narrow: name, origin, language, city, and one current activity.',
      'Shadow the script aloud until it sounds like one memorized unit rather than a translated sentence.',
      'Use the same script in every speaking session until it becomes low-effort.',
    ],
    resources: [
      {
        title: 'Reddit guide thread',
        url: 'https://www.reddit.com/r/hungarian/comments/lg36p9/an_ultimate_guide_to_learning_hungarian_10_steps/',
        note: 'Source for the first-script recommendation and the speaking-first sequencing.',
      },
      {
        title: 'Catch Budapest resource list',
        url: 'https://www.catchbudapest.com/hungarian-learning-resources/',
        note: 'Use it to pick a phrasebook, podcast, or tutor source once the script exists.',
      },
      {
        title: 'Lonely Planet Hungarian phrasebook listing',
        url: 'https://www.catchbudapest.com/hungarian-learning-resources/',
        note: 'The resource list recommends a phrasebook for fast survival chunks.',
      },
    ],
    explanations: [
      {
        title: 'Scripts create early fluency',
        body:
          'A first script gives you a controlled success case. Instead of waiting until you “know enough Hungarian,” you start speaking with material you can actually control.',
      },
      {
        title: 'Chunks beat word-by-word assembly',
        body:
          'Treat phrases such as Jó napot kívánok, Magyarul tanulok, and Honnan jöttél? as single units. This keeps your speech moving even when grammar is still thin.',
      },
      {
        title: 'Personal language sticks better',
        body:
          'The first script should be about you. Personalized sentences are easier to remember and become reusable faster in real interaction.',
      },
    ],
    vocabulary: [
      { hungarian: 'Jó napot kívánok', english: 'good afternoon / good day', note: 'polite' },
      { hungarian: 'Hogy hívnak?', english: 'What is your name?' },
      { hungarian: 'Örülök', english: 'nice to meet you / I am glad' },
      { hungarian: 'Magyarul tanulok', english: 'I am learning Hungarian' },
      { hungarian: 'Angliából jöttem', english: 'I came from England / I am from England' },
      { hungarian: 'Honnan jöttél?', english: 'Where are you from?' },
    ],
    examples: [
      {
        hungarian: 'Szia, Anna vagyok.',
        english: 'Hi, I am Anna.',
        focus: 'Simple self-introduction',
      },
      {
        hungarian: 'Angolul beszélek, és magyarul tanulok.',
        english: 'I speak English, and I am learning Hungarian.',
        focus: 'Language profile',
      },
      {
        hungarian: 'Honnan jöttél?',
        english: 'Where are you from?',
        focus: 'Follow-up question',
      },
    ],
    practiceSets: [
      {
        id: 'curated-script-fill',
        type: 'fill',
        title: 'Complete the first script',
        instructions:
          'Choose the word or chunk that keeps the introduction natural and beginner-friendly.',
        questions: [
          {
            id: 'cs1',
            prompt: 'Complete the identity statement.',
            template: 'Anna ___ .',
            choices: ['vagyok', 'van', 'lesz'],
            answer: 'vagyok',
            note: 'This is the basic I am form you will reuse constantly in self-introductions.',
          },
          {
            id: 'cs2',
            prompt: 'Ask where someone is from.',
            template: '___ jöttél?',
            choices: ['Honnan', 'Mikor', 'Mennyi'],
            answer: 'Honnan',
            note: 'This is one of the most useful early questions for small talk.',
          },
          {
            id: 'cs3',
            prompt: 'Add the current activity.',
            template: 'Magyarul ___ .',
            choices: ['tanulok', 'reggelt', 'forint'],
            answer: 'tanulok',
            note: 'A first script becomes more natural when you add one action sentence.',
          },
        ],
      },
      {
        id: 'curated-script-match',
        type: 'match',
        title: 'Match survival chunks to meaning',
        instructions:
          'Lock in the high-frequency chunks you need before open-ended speaking.',
        pairs: [
          { left: 'Jó napot kívánok', right: 'good afternoon / good day' },
          { left: 'Hogy hívnak?', right: 'What is your name?' },
          { left: 'Örülök', right: 'nice to meet you / I am glad' },
          { left: 'Magyarul tanulok', right: 'I am learning Hungarian' },
          { left: 'Honnan jöttél?', right: 'Where are you from?' },
        ],
      },
    ],
  },
  {
    id: 'curated-present-tense-core-verbs',
    trackId: 'curated-learning',
    topics: ['present', 'verbs', 'vocabulary'],
    level: 'A1',
    phase: 'A1 Foundations',
    sequence: 4,
    title: 'Present Tense and Core Verbs',
    subtitle: 'Use the highest-value verbs before worrying about broad grammar coverage.',
    summary:
      'This lesson uses the present tense mini-lesson and the 10 important verbs as the backbone for beginner sentence building. It now adds subject-based scene practice so you can see how the same situation changes with én, te, ő / ön, mi, ti, and ők.',
    sourceUnits: ['Present tense', '10 important verbs'],
    goals: [
      'Use van and nincs in basic presence and absence statements.',
      'Build simple present-tense sentences with a small set of high-frequency verbs.',
      'Get comfortable with reusable action frames instead of isolated grammar charts.',
      'Practice the same verb across different subjects and real situations.',
    ],
    studyFlow: [
      'Study the present tense lesson once, then keep only the forms you can use today.',
      'Memorize a small working set of verbs and attach each one to a real sentence about your life.',
      'Repeat whole sentence frames such as Most magyarul tanulok and Holnap Budapestre megyek.',
      'Take one situation and run it through several subjects: én, te, ő / ön, then mi and ők.',
      'Ask Mit csinál? or Mit csinálsz? before answering so the verb comes from a real communicative cue.',
      'Leave fine-grained verb tables for later refinement; keep production practical.',
    ],
    resources: [
      {
        title: 'Catch Budapest present tense mini-lesson',
        url: 'https://www.catchbudapest.com/learn-hungarian-present-tense/',
        note: 'Use for the basic present-tense frame and learner-friendly overview.',
      },
      {
        title: 'Catch Budapest 10 important verbs',
        url: 'https://www.catchbudapest.com/learn-important-hungarian-verbs/',
        note: 'Provides the highest-value beginner verb inventory.',
      },
      {
        title: 'Hungarian Reference',
        url: 'http://www.hungarianreference.com/',
        note: 'Use later when you want a denser grammar explanation.',
      },
    ],
    explanations: [
      {
        title: 'High-frequency verbs unlock output',
        body:
          'A small verb set gives you more usable speech than a large list of nouns. Prioritize verbs you can combine with your personal vocabulary right away.',
      },
      {
        title: 'Start with indefinite-style sentence frames',
        body:
          'At this stage the focus is building short, natural sentences. You only need awareness that Hungarian verb behavior will get more detailed later.',
      },
      {
        title: 'Subject endings do the heavy lifting',
        body:
          'You do not need full tables for every verb on day one, but you should notice that the ending changes with the subject. Running the same scene through I, you, he or she, we, and they makes the pattern much easier to feel.',
      },
      {
        title: 'Use van and nincs as anchors',
        body:
          'Presence, absence, possession, and location all lean heavily on van and nincs. These are worth overlearning early.',
      },
    ],
    vocabulary: [
      { hungarian: 'van', english: 'is / there is' },
      { hungarian: 'nincs', english: 'is not / there is not' },
      { hungarian: 'tanulok', english: 'I study / learn', note: 'én' },
      { hungarian: 'tanulsz', english: 'you study / learn', note: 'te' },
      { hungarian: 'tanul', english: 'he / she / you formal studies', note: 'ő / ön' },
      { hungarian: 'tanulunk', english: 'we study / learn', note: 'mi' },
      { hungarian: 'tanultok', english: 'you plural study / learn', note: 'ti' },
      { hungarian: 'tanulnak', english: 'they study / learn', note: 'ők' },
      { hungarian: 'beszélek', english: 'I speak', note: 'én' },
      { hungarian: 'beszélsz', english: 'you speak', note: 'te' },
      { hungarian: 'beszél', english: 'he / she / you formal speaks', note: 'ő / ön' },
      { hungarian: 'beszélünk', english: 'we speak', note: 'mi' },
      { hungarian: 'megyek', english: 'I go', note: 'én' },
      { hungarian: 'mész', english: 'you go', note: 'te' },
      { hungarian: 'megy', english: 'he / she / you formal goes', note: 'ő / ön' },
      { hungarian: 'csinálok', english: 'I do', note: 'én' },
      { hungarian: 'csinálsz', english: 'you do', note: 'te' },
      { hungarian: 'csinál', english: 'he / she / you formal does', note: 'ő / ön' },
    ],
    examples: [
      {
        hungarian: 'Én most magyarul tanulok.',
        english: 'I am studying Hungarian now.',
        focus: 'First-person present',
      },
      {
        hungarian: 'Te este otthon tanulsz?',
        english: 'Are you studying at home this evening?',
        focus: 'Second-person scene',
      },
      {
        hungarian: 'Ő most a boltba megy.',
        english: 'He or she is going to the shop now.',
        focus: 'Third-person action',
      },
      {
        hungarian: 'Ön magyarul beszél?',
        english: 'Do you speak Hungarian?',
        focus: 'Formal question',
      },
      {
        hungarian: 'Mi a kávézóban beszélünk.',
        english: 'We are talking in the café.',
        focus: 'First-person plural',
      },
      {
        hungarian: 'Ők most az iskolában tanulnak.',
        english: 'They are studying in the school now.',
        focus: 'Third-person plural',
      },
      {
        hungarian: 'Mit csinálsz este? Este magyarul tanulok.',
        english: 'What are you doing this evening? I study Hungarian in the evening.',
        focus: 'Question + answer frame',
      },
      {
        hungarian: 'A kávé az asztalon van, de cukor nincs benne.',
        english: 'The coffee is on the table, but there is no sugar in it.',
        focus: 'van and nincs as anchors',
      },
    ],
    practiceSets: [
      {
        id: 'curated-verbs-fill',
        type: 'fill',
        title: 'Pick the verb that fits the situation',
        instructions:
          'Complete each sentence with the verb form that keeps the situation simple and natural.',
        questions: [
          {
            id: 'cv1',
            prompt: 'Talk about studying now.',
            template: 'Most magyarul ___ .',
            choices: ['tanulok', 'jövök', 'forint'],
            answer: 'tanulok',
            note: 'This is one of the best first-person present-tense anchors.',
          },
          {
            id: 'cv2',
            prompt: 'Say that you are going to Budapest tomorrow.',
            template: 'Holnap Budapestre ___ .',
            choices: ['megyek', 'mész', 'megy'],
            answer: 'megyek',
            note: 'Use the first-person form when the subject is I.',
          },
          {
            id: 'cv3',
            prompt: 'Say that he or she is speaking with the receptionist.',
            template: 'A recepcióval ___ .',
            choices: ['beszél', 'beszélsz', 'beszélek'],
            answer: 'beszél',
            note: 'Third-person singular fits ő or ön.',
          },
          {
            id: 'cv4',
            prompt: 'Complete the presence statement.',
            template: 'A könyv az asztalon ___ .',
            choices: ['van', 'megy', 'jön'],
            answer: 'van',
            note: 'Use van for basic is / there is statements.',
          },
          {
            id: 'cv5',
            prompt: 'Say that we are talking in the café.',
            template: 'A kávézóban ___ .',
            choices: ['beszélünk', 'beszéltek', 'beszélnek'],
            answer: 'beszélünk',
            note: 'The situation stays the same, only the subject changes.',
          },
          {
            id: 'cv6',
            prompt: 'Say that they are studying at school now.',
            template: 'Most az iskolában ___ .',
            choices: ['tanulnak', 'tanulunk', 'tanultok'],
            answer: 'tanulnak',
            note: 'Use the they form for ők.',
          },
          {
            id: 'cv7',
            prompt: 'Ask formally: What are you doing now?',
            template: 'Ön most mit ___ ?',
            choices: ['csinál', 'csinálsz', 'csinálok'],
            answer: 'csinál',
            note: 'Formal ön uses the same verb form as ő.',
          },
          {
            id: 'cv8',
            prompt: 'Say that there is no sugar in the coffee.',
            template: 'A kávéban cukor ___ .',
            choices: ['nincs', 'van', 'megy'],
            answer: 'nincs',
            note: 'Use nincs for absence.',
          },
          {
            id: 'cv9',
            prompt: 'Ask a friend: What are you doing this evening?',
            template: 'Este mit ___ ?',
            choices: ['csinálsz', 'csinál', 'csinálok'],
            answer: 'csinálsz',
            note: 'This is the direct te question form.',
          },
          {
            id: 'cv10',
            prompt: 'Say that you speak Hungarian.',
            template: 'Magyarul ___ .',
            choices: ['beszélek', 'beszélsz', 'beszél'],
            answer: 'beszélek',
            note: 'This is the first-person default answer in self-introduction scenes.',
          },
        ],
      },
      {
        id: 'curated-verbs-subject-fill',
        type: 'fill',
        title: 'Run the same situation across different subjects',
        instructions:
          'The scene stays the same while the subject changes. Choose the verb form that matches the subject.',
        questions: [
          {
            id: 'cvs1',
            prompt: 'Evening study scene, first person.',
            template: 'Én este magyarul ___ .',
            choices: ['tanulok', 'tanulsz', 'tanul'],
            answer: 'tanulok',
            note: 'First-person singular ending.',
          },
          {
            id: 'cvs2',
            prompt: 'Same scene, second person.',
            template: 'Te este magyarul ___ ?',
            choices: ['tanulsz', 'tanulok', 'tanul'],
            answer: 'tanulsz',
            note: 'Second-person singular ending.',
          },
          {
            id: 'cvs3',
            prompt: 'Same scene, third person.',
            template: 'Ő este magyarul ___ .',
            choices: ['tanul', 'tanulsz', 'tanulok'],
            answer: 'tanul',
            note: 'Third-person singular ending.',
          },
          {
            id: 'cvs4',
            prompt: 'Same speaking scene, first person plural.',
            template: 'Mi a kávézóban ___ .',
            choices: ['beszélünk', 'beszéltek', 'beszélnek'],
            answer: 'beszélünk',
            note: 'Use the we form here.',
          },
          {
            id: 'cvs5',
            prompt: 'Same speaking scene, second person plural.',
            template: 'Ti a kávézóban ___ ?',
            choices: ['beszéltek', 'beszélünk', 'beszél'],
            answer: 'beszéltek',
            note: 'Use the you plural form here.',
          },
          {
            id: 'cvs6',
            prompt: 'Same study scene, third person plural.',
            template: 'Ők az iskolában ___ .',
            choices: ['tanulnak', 'tanultok', 'tanulunk'],
            answer: 'tanulnak',
            note: 'Use the they form here.',
          },
          {
            id: 'cvs7',
            prompt: 'Going to Budapest, second person singular.',
            template: 'Te holnap Budapestre ___ .',
            choices: ['mész', 'megyek', 'megy'],
            answer: 'mész',
            note: 'This is the te form of megy.',
          },
          {
            id: 'cvs8',
            prompt: 'Formal question with ön.',
            template: 'Ön ma mit ___ ?',
            choices: ['csinál', 'csinálsz', 'csinálok'],
            answer: 'csinál',
            note: 'Ön patterns with the third-person singular verb.',
          },
        ],
      },
      {
        id: 'curated-verbs-match',
        type: 'match',
        title: 'Match conjugated forms to subject meaning',
        instructions:
          'Match the present-tense form to the person and meaning it expresses.',
        pairs: [
          { left: 'van', right: 'is / there is' },
          { left: 'nincs', right: 'is not / there is not' },
          { left: 'tanulok', right: 'I study / learn' },
          { left: 'tanulsz', right: 'you study / learn' },
          { left: 'tanul', right: 'he / she / you formal studies' },
          { left: 'tanulunk', right: 'we study / learn' },
          { left: 'tanulnak', right: 'they study / learn' },
          { left: 'megyek', right: 'I go' },
          { left: 'mész', right: 'you go' },
          { left: 'megy', right: 'he / she / you formal goes' },
          { left: 'beszélünk', right: 'we speak' },
          { left: 'csinálsz', right: 'you do' },
        ],
      },
      createFlashcardPracticeSet({
        id: 'curated-verbs-scenario-flashcards',
        title: 'Scenario flashcards for real present-tense use',
        instructions:
          'Read the cue, answer with the full Hungarian sentence, then flip the card and compare.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'I am studying Hungarian now.',
            answer: 'Most magyarul tanulok.',
          },
          {
            scenario: 'You are going to Budapest tomorrow.',
            answer: 'Holnap Budapestre mész.',
          },
          {
            scenario: 'He or she is going to the shop now.',
            answer: 'Most a boltba megy.',
          },
          {
            scenario: 'Do you speak Hungarian? formal',
            answer: 'Ön magyarul beszél?',
          },
          {
            scenario: 'We are talking in the café.',
            answer: 'A kávézóban beszélünk.',
          },
          {
            scenario: 'They are studying in the school.',
            answer: 'Az iskolában tanulnak.',
          },
          {
            scenario: 'What are you doing this evening? informal',
            answer: 'Mit csinálsz este?',
          },
          {
            scenario: 'What is he or she doing? / What is formal you doing?',
            answer: 'Mit csinál?',
          },
          {
            scenario: 'There is coffee on the table.',
            answer: 'A kávé az asztalon van.',
          },
          {
            scenario: 'There is no sugar in the coffee.',
            answer: 'Nincs cukor a kávéban.',
          },
        ]),
        sessionSize: 10,
        frontLabel: 'Situation',
        backLabel: 'Hungarian sentence',
      }),
    ],
  },
  {
    id: 'curated-shopping-location-transactions',
    trackId: 'curated-learning',
    topics: ['shopping', 'location', 'movement'],
    level: 'A1',
    phase: 'A1 Everyday Use',
    sequence: 5,
    title: 'Shopping, Location, and Transactions',
    subtitle: 'Handle café, shop, and navigation exchanges with useful chunks.',
    summary:
      'This lesson folds polite requests, simple price questions, and core location patterns into one practical set. The aim is usable city survival language, not a full case-system tour.',
    sourceUnits: ['Resource list', 'Phrasebook path'],
    goals: [
      'Order food and drinks politely.',
      'Ask how much something costs and understand a short answer.',
      'Ask where a place is and respond with basic location language.',
    ],
    studyFlow: [
      'Memorize two or three ordering patterns as fixed chunks before changing vocabulary inside them.',
      'Learn location endings in ready-made phrases such as a boltban and az étteremben.',
      'Pair every new place word with a real need: buying, finding, sitting, waiting, or paying.',
      'Rehearse short shop dialogues aloud until they feel automatic under time pressure.',
    ],
    resources: [
      {
        title: 'Catch Budapest resource list',
        url: 'https://www.catchbudapest.com/hungarian-learning-resources/',
        note: 'Use it to select phrasebook and listening support for practical exchanges.',
      },
      {
        title: 'Catch Budapest numbers guide',
        url: 'https://www.catchbudapest.com/hungarian-numbers/',
        note: 'Revisit this for price recognition inside shopping practice.',
      },
      {
        title: 'Hungarian Reference',
        url: 'http://www.hungarianreference.com/',
        note: 'Good follow-up source if you want fuller explanations of location endings.',
      },
    ],
    explanations: [
      {
        title: 'Chunks first, endings second',
        body:
          'For survival speech, ready-made phrases are more useful than abstract grammar labels. Learn a boltban and az étteremben as whole forms before analyzing every suffix.',
      },
      {
        title: 'Kérek and szeretnék do heavy lifting',
        body:
          'These polite request frames let beginners handle a large number of service interactions without complicated sentence building.',
      },
      {
        title: 'Practical language repeats',
        body:
          'Shop, café, and navigation language recycle the same question patterns. That makes them ideal for quick confidence gains.',
      },
    ],
    vocabulary: [
      { hungarian: 'kérek', english: 'I would like / I ask for' },
      { hungarian: 'szeretnék', english: 'I would like' },
      { hungarian: 'boltban', english: 'in the shop' },
      { hungarian: 'étteremben', english: 'in the restaurant' },
      { hungarian: 'balra', english: 'to the left' },
      { hungarian: 'jobbra', english: 'to the right' },
    ],
    examples: [
      {
        hungarian: 'Kérek egy kávét.',
        english: 'I would like a coffee.',
        focus: 'Ordering chunk',
      },
      {
        hungarian: 'Mennyibe kerül a tea?',
        english: 'How much is the tea?',
        focus: 'Price question',
      },
      {
        hungarian: 'A boltban vagyok, a pályaudvar balra van.',
        english: 'I am in the shop, the station is to the left.',
        focus: 'Location and direction',
      },
    ],
    practiceSets: [
      {
        id: 'curated-transactions-fill',
        type: 'fill',
        title: 'Complete the transaction phrase',
        instructions:
          'Choose the chunk that keeps the practical exchange natural and useful.',
        questions: [
          {
            id: 'ct1',
            prompt: 'Order a tea politely.',
            template: '___ egy teát.',
            choices: ['Kérek', 'Honnan', 'Holnap'],
            answer: 'Kérek',
            note: 'This is one of the highest-value ordering frames in beginner Hungarian.',
          },
          {
            id: 'ct2',
            prompt: 'Choose the in the shop form.',
            template: 'A ___ vagyok.',
            choices: ['boltban', 'boltból', 'boltra'],
            answer: 'boltban',
            note: 'Keep the whole location chunk together in memory.',
          },
          {
            id: 'ct3',
            prompt: 'Give a simple direction.',
            template: 'A metró ___ van.',
            choices: ['balra', 'tegnap', 'forint'],
            answer: 'balra',
            note: 'Direction words are frequent in daily city survival.',
          },
        ],
      },
      {
        id: 'curated-transactions-match',
        type: 'match',
        title: 'Match practical location and service words',
        instructions:
          'Review the chunks you need in shops, cafés, and simple navigation.',
        pairs: [
          { left: 'kérek', right: 'I would like / I ask for' },
          { left: 'szeretnék', right: 'I would like' },
          { left: 'boltban', right: 'in the shop' },
          { left: 'étteremben', right: 'in the restaurant' },
          { left: 'jobbra', right: 'to the right' },
        ],
      },
    ],
  },
  {
    id: 'curated-daily-routine-self-profile',
    trackId: 'curated-learning',
    topics: ['routine', 'introductions', 'speaking'],
    level: 'A1+',
    phase: 'A1 Everyday Use',
    sequence: 6,
    title: 'Daily Routine and Self-Profile',
    subtitle: 'Expand the first script into a fuller personal profile and routine.',
    summary:
      'This lesson turns high-frequency vocabulary into usable personal speech. You will talk about where you live, what you do, and what a normal day looks like, using connective words to extend beyond one isolated sentence.',
    sourceUnits: ['Reddit step 5', '500 spoken words'],
    goals: [
      'Describe where you live, work, or study.',
      'Talk through a basic daily routine in short linked sentences.',
      'Prioritize high-frequency vocabulary over broad themed word lists.',
    ],
    studyFlow: [
      'Take the 500-word idea seriously and focus on what appears in real speech, not in decorative topic lists.',
      'Attach every new routine verb to one sentence about your own life.',
      'Link two or three short clauses with és, de, and mert to build longer speaking turns.',
      'Recycle the same routine script in writing and speech until it feels stable.',
    ],
    resources: [
      {
        title: 'Catch Budapest 500 spoken words course',
        url: 'https://www.catchbudapest.com/free-hungarian-vocabulary-course/',
        note: 'Use as the vocabulary backbone for the whole curated path.',
      },
      {
        title: 'Reddit guide thread',
        url: 'https://www.reddit.com/r/hungarian/comments/lg36p9/an_ultimate_guide_to_learning_hungarian_10_steps/',
        note: 'Source for the high-frequency vocabulary emphasis.',
      },
      {
        title: 'Anki manual',
        url: 'https://docs.ankiweb.net/',
        note: 'Use for SRS review once you start accumulating personalized routine vocabulary.',
      },
    ],
    explanations: [
      {
        title: 'Frequency beats topic coverage',
        body:
          'A beginner gains more from mastering common verbs, pronouns, and daily chunks than from learning narrow word lists like zoo animals or appliances.',
      },
      {
        title: 'Personal routine language is reusable',
        body:
          'Talking about where you live, what you do, and what you do every day gives you material for tutors, language partners, and short writing tasks.',
      },
      {
        title: 'Link sentences early',
        body:
          'You do not need advanced grammar to sound less robotic. Simple connectors already let you move from isolated facts to short connected speech.',
      },
    ],
    vocabulary: [
      { hungarian: 'élek', english: 'I live' },
      { hungarian: 'dolgozom', english: 'I work' },
      { hungarian: 'tanulok', english: 'I study / I learn' },
      { hungarian: 'reggel', english: 'in the morning' },
      { hungarian: 'este', english: 'in the evening' },
      { hungarian: 'család', english: 'family' },
    ],
    examples: [
      {
        hungarian: 'Budapesten élek, és otthon dolgozom.',
        english: 'I live in Budapest, and I work from home.',
        focus: 'Place + routine',
      },
      {
        hungarian: 'Reggel kávét iszom, este magyarul tanulok.',
        english: 'In the morning I drink coffee, in the evening I study Hungarian.',
        focus: 'Daily routine',
      },
      {
        hungarian: 'Kis családom van.',
        english: 'I have a small family.',
        focus: 'Personal profile',
      },
    ],
    practiceSets: [
      {
        id: 'curated-routine-fill',
        type: 'fill',
        title: 'Complete the self-profile sentence',
        instructions:
          'Choose the word that keeps the routine or personal profile natural.',
        questions: [
          {
            id: 'cr1',
            prompt: 'Say where you live.',
            template: 'Budapesten ___ .',
            choices: ['élek', 'forint', 'balra'],
            answer: 'élek',
            note: 'Place + élek is a very high-value self-profile frame.',
          },
          {
            id: 'cr2',
            prompt: 'Describe a morning routine.',
            template: 'Reggel kávét ___ .',
            choices: ['iszom', 'megyek', 'jöttem'],
            answer: 'iszom',
            note: 'Use practical daily actions, even if your verb list is still small.',
          },
          {
            id: 'cr3',
            prompt: 'Add the connector.',
            template: 'Budapesten élek, ___ otthon dolgozom.',
            choices: ['és', 'honnan', 'tegnap'],
            answer: 'és',
            note: 'Simple connectors help you sound less choppy very quickly.',
          },
        ],
      },
      {
        id: 'curated-routine-match',
        type: 'match',
        title: 'Match routine words to meaning',
        instructions:
          'Review the profile and daily-life vocabulary that will keep reappearing.',
        pairs: [
          { left: 'élek', right: 'I live' },
          { left: 'dolgozom', right: 'I work' },
          { left: 'tanulok', right: 'I study / I learn' },
          { left: 'reggel', right: 'in the morning' },
          { left: 'este', right: 'in the evening' },
        ],
      },
    ],
  },
  {
    id: 'curated-past-plans-appointments',
    trackId: 'curated-learning',
    topics: ['planning', 'travel', 'time'],
    level: 'A2',
    phase: 'A2 Bridge',
    sequence: 7,
    title: 'Past, Plans, and Appointments',
    subtitle: 'Move from static beginner speech into short time-based interaction.',
    summary:
      'This lesson is the bridge into A2-style tasks: talking about yesterday and tomorrow, expressing what you can or need to do, and handling simple scheduling language such as appointments and visits.',
    sourceUnits: ['Hungarian Reference', 'A2 bridge'],
    goals: [
      'Talk simply about past actions and future plans.',
      'Use modal meaning with can, need, and would like.',
      'Handle basic appointment and travel situations in short exchanges.',
    ],
    studyFlow: [
      'Add time words first, then attach one or two past or future actions to them.',
      'Keep your first past-tense statements short and practical rather than descriptive.',
      'Practice appointment language as mini-dialogues, not as isolated vocabulary.',
      'Bring these patterns into speaking sessions quickly so they do not stay passive.',
    ],
    resources: [
      {
        title: 'Hungarian Reference',
        url: 'http://www.hungarianreference.com/',
        note: 'Use for fuller explanation of tense and modal patterns when needed.',
      },
      {
        title: 'Catch Budapest resource list',
        url: 'https://www.catchbudapest.com/hungarian-learning-resources/',
        note: 'Use the tutor and audio resources here for bridge-to-A2 speaking practice.',
      },
      {
        title: 'Europass CEFR self-assessment grid',
        url: 'https://europass.europa.eu/en/common-european-framework-reference-language-skills',
        note: 'Reference point for what the A2 endpoint should feel like.',
      },
    ],
    explanations: [
      {
        title: 'Time words do a lot of the work',
        body:
          'At this level, words such as tegnap and holnap make your timeline clearer even before you fully control every tense pattern.',
      },
      {
        title: 'Modals expand usefulness fast',
        body:
          'Can, need, and would like are practical because they cover appointments, requests, travel, and daily constraints with a small amount of grammar.',
      },
      {
        title: 'A2 means routine problem solving',
        body:
          'You do not need elegant narration yet. You need to say what happened, what will happen, and what you need in predictable situations.',
      },
    ],
    vocabulary: [
      { hungarian: 'tegnap', english: 'yesterday' },
      { hungarian: 'holnap', english: 'tomorrow' },
      { hungarian: 'voltam', english: 'I was / I went' },
      { hungarian: 'mentem', english: 'I went' },
      { hungarian: 'tudok', english: 'I can' },
      { hungarian: 'időpont', english: 'appointment' },
    ],
    examples: [
      {
        hungarian: 'Tegnap dolgoztam, ma pihenek.',
        english: 'Yesterday I worked, today I am resting.',
        focus: 'Past to present contrast',
      },
      {
        hungarian: 'Holnap orvoshoz megyek.',
        english: 'Tomorrow I am going to the doctor.',
        focus: 'Future plan with time word',
      },
      {
        hungarian: 'Szeretnék egy időpontot kérni.',
        english: 'I would like to ask for an appointment.',
        focus: 'Appointment language',
      },
    ],
    practiceSets: [
      {
        id: 'curated-a2-fill',
        type: 'fill',
        title: 'Complete the time and planning pattern',
        instructions:
          'Choose the word that makes the scheduling or time-based sentence work.',
        questions: [
          {
            id: 'cA21',
            prompt: 'Say that yesterday you were in Budapest.',
            template: 'Tegnap Budapesten ___ .',
            choices: ['voltam', 'balra', 'forint'],
            answer: 'voltam',
            note: 'Short past statements are enough at this stage.',
          },
          {
            id: 'cA22',
            prompt: 'Add the future time word.',
            template: '___ orvoshoz megyek.',
            choices: ['Holnap', 'Honnan', 'Szia'],
            answer: 'Holnap',
            note: 'A future time word often carries most of the planning meaning.',
          },
          {
            id: 'cA23',
            prompt: 'Ask for an appointment politely.',
            template: 'Szeretnék egy ___ kérni.',
            choices: ['időpontot', 'kávét', 'reggelt'],
            answer: 'időpontot',
            note: 'This is a practical A2 survival phrase worth memorizing whole.',
          },
        ],
      },
      {
        id: 'curated-a2-match',
        type: 'match',
        title: 'Match planning words to meaning',
        instructions:
          'Review the time and planning words that move you toward routine A2 interaction.',
        pairs: [
          { left: 'tegnap', right: 'yesterday' },
          { left: 'holnap', right: 'tomorrow' },
          { left: 'voltam', right: 'I was / I went' },
          { left: 'mentem', right: 'I went' },
          { left: 'időpont', right: 'appointment' },
        ],
      },
    ],
  },
  {
    id: 'curated-a2-consolidation',
    trackId: 'curated-learning',
    topics: ['listening', 'writing', 'health'],
    level: 'A2',
    phase: 'A2 Consolidation',
    sequence: 8,
    title: 'A2 Consolidation and Real-World Tasks',
    subtitle: 'Use immersion, SRS, and speaking to stabilize usable everyday Hungarian.',
    summary:
      'The final starter lesson connects three habits from the source plan: transcript-supported immersion, Anki-based review, and regular speaking. The content focus is repair language, short messages, and basic health or help situations.',
    sourceUnits: ['Reddit steps 8 to 10', 'Anki + speaking'],
    goals: [
      'Use repair phrases to keep a conversation alive when comprehension drops.',
      'Write very short messages and notes about routine needs.',
      'Keep vocabulary active through spaced repetition and guided speaking.',
    ],
    studyFlow: [
      'Use transcript-supported audio or short dialogues instead of random passive listening.',
      'Add only useful, high-frequency words and chunks to Anki, then review them daily.',
      'Do one regular speaking session each week and recycle the same practical topics until they become easy.',
      'Close the loop by turning listening vocabulary into speaking and writing output.',
    ],
    resources: [
      {
        title: 'Reddit guide thread',
        url: 'https://www.reddit.com/r/hungarian/comments/lg36p9/an_ultimate_guide_to_learning_hungarian_10_steps/',
        note: 'Source for the immersion, Anki, and speaking steps.',
      },
      {
        title: 'Anki manual',
        url: 'https://docs.ankiweb.net/',
        note: 'Use for card design and sustainable SRS habits.',
      },
      {
        title: 'Catch Budapest resource list',
        url: 'https://www.catchbudapest.com/hungarian-learning-resources/',
        note: 'Use it to pick audio, stories, or tutor platforms for regular practice.',
      },
    ],
    explanations: [
      {
        title: 'Immersion needs support',
        body:
          'Raw immersion is usually too hard at this level. Transcript-backed audio and short controlled texts give you input you can actually use.',
      },
      {
        title: 'SRS should stay practical',
        body:
          'Anki works best when cards are built from your real lessons and interactions, not from giant disconnected word dumps.',
      },
      {
        title: 'Repair language protects fluency',
        body:
          'A2 conversation depends as much on survival phrases such as “I do not understand” and “please repeat that” as on new grammar.',
      },
    ],
    vocabulary: [
      { hungarian: 'nem értem', english: 'I do not understand' },
      { hungarian: 'lassabban', english: 'more slowly' },
      { hungarian: 'megismétli?', english: 'could you repeat that?' },
      { hungarian: 'fáj', english: 'hurts' },
      { hungarian: 'üzenet', english: 'message' },
      { hungarian: 'segítség', english: 'help' },
    ],
    examples: [
      {
        hungarian: 'Elnézést, nem értem.',
        english: 'Sorry, I do not understand.',
        focus: 'Repair phrase',
      },
      {
        hungarian: 'Tudna lassabban beszélni?',
        english: 'Could you speak more slowly?',
        focus: 'Comprehension support',
      },
      {
        hungarian: 'Küldök egy rövid üzenetet.',
        english: 'I am sending a short message.',
        focus: 'Simple writing task',
      },
    ],
    practiceSets: [
      {
        id: 'curated-consolidation-fill',
        type: 'fill',
        title: 'Complete the repair or message phrase',
        instructions:
          'Choose the word that keeps the A2 support phrase clear and useful.',
        questions: [
          {
            id: 'cc1',
            prompt: 'Say that you do not understand.',
            template: 'Nem ___ .',
            choices: ['értem', 'forint', 'tegnap'],
            answer: 'értem',
            note: 'This is a must-have phrase for real conversation at every level.',
          },
          {
            id: 'cc2',
            prompt: 'Ask for slower speech.',
            template: 'Tudna ___ beszélni?',
            choices: ['lassabban', 'balra', 'otthon'],
            answer: 'lassabban',
            note: 'Repair language keeps conversation going when your listening drops.',
          },
          {
            id: 'cc3',
            prompt: 'Complete the message phrase.',
            template: 'Küldök egy rövid ___ .',
            choices: ['üzenetet', 'családot', 'időpontot'],
            answer: 'üzenetet',
            note: 'Short written tasks are part of the A2 target profile.',
          },
        ],
      },
      {
        id: 'curated-consolidation-match',
        type: 'match',
        title: 'Match repair and support language',
        instructions:
          'Review the phrases that make real-world interaction survivable at A2.',
        pairs: [
          { left: 'nem értem', right: 'I do not understand' },
          { left: 'lassabban', right: 'more slowly' },
          { left: 'megismétli?', right: 'could you repeat that?' },
          { left: 'üzenet', right: 'message' },
          { left: 'segítség', right: 'help' },
        ],
      },
    ],
  },
]
