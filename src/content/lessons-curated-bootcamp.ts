import { buildScenarioFlashcardCards, createFlashcardPracticeSet } from './practice-helpers'
import type { Lesson } from './types'

const curatedBootcampNumberLessonSeed: Lesson[] = [
  {
    id: 'curated-counting-money',
    trackId: 'curated-learning',
    topics: ['numbers', 'prices', 'speaking'],
    level: '0 -> A1',
    phase: 'Bootcamp',
    sequence: 2,
    title: 'Counting, Numbers, and Money',
    subtitle: 'Count quickly, recognize prices, and survive the first money exchanges.',
    summary:
      'This lesson separates number handling from calendar and clock language. The goal is fast recognition of quantities, larger written numbers, and everyday price patterns such as mennyibe kerül and number + forint.',
    sourceUnits: ['Reddit step 4', 'Workbook unit 2'],
    goals: [
      'Count common objects and answer Hány ... van itt? without hesitation.',
      'Read and build practical numbers from tens to thousands.',
      'Ask and answer simple price questions with forint amounts.',
      'Use number chunks inside short buying exchanges.',
    ],
    studyFlow: [
      'Learn the anchor numbers first, then build larger forms from those anchors instead of memorizing one long list.',
      'Drill counting scenes and price questions aloud until Hány and Mennyibe kerül? feel automatic.',
      'Keep one short menu or shopping list in front of you and answer price questions quickly, not perfectly slowly.',
      'Repeat the lesson several times and let the changing rounds force you to recall nearby number forms under pressure.',
    ],
    resources: [
      {
        title: 'Catch Budapest numbers guide',
        url: 'https://www.catchbudapest.com/hungarian-numbers/',
        note: 'Core reference for building larger numbers from smaller anchors.',
      },
      {
        title: 'Foreign Numbers',
        url: 'https://foreignnumbers.com/',
        note: 'Useful for speed drills once the written forms look familiar.',
      },
      {
        title: 'Reddit guide thread',
        url: 'https://www.reddit.com/r/hungarian/comments/lg36p9/an_ultimate_guide_to_learning_hungarian_10_steps/',
        note: 'Reinforces why numbers should come early in the path.',
      },
    ],
    explanations: [
      {
        title: 'Anchor numbers do the heavy lifting',
        body:
          'Do not try to memorize every number separately. Store a small group of anchors and build from them: unit numbers, tens, száz, and ezer.',
        tables: [
          {
            title: 'Useful anchors',
            columns: ['Number', 'Hungarian'],
            rows: [
              ['1', 'egy'],
              ['2', 'kettő'],
              ['5', 'öt'],
              ['10', 'tíz'],
              ['20', 'húsz'],
              ['30', 'harminc'],
              ['40', 'negyven'],
              ['50', 'ötven'],
              ['100', 'száz'],
              ['200', 'kétszáz'],
              ['1000', 'ezer'],
            ],
            note:
              'These anchors let you build forms such as negyvenöt, ötszáznegyvennyolc, and hatszázhuszonöt.',
          },
        ],
      },
      {
        title: 'Counting and price questions are not the same',
        body:
          'Use Hány for countable things you can point at. Use Mennyi or Mennyibe kerül? for amounts and prices.',
        tips: [
          'Hány üveg van itt? Öt.',
          'Mennyibe kerül a tea? Száz forint.',
        ],
      },
      {
        title: 'Treat number plus forint as one chunk',
        body:
          'In real life you hear prices as compact units. Practice number + forint together so the price feels like one block of meaning.',
      },
      {
        title: 'Menu prices are good pressure drills',
        body:
          'The workbook menu is valuable because it forces quick recognition of close price forms instead of relaxed list recitation.',
        tables: [
          {
            title: 'Workbook snack bar prices',
            columns: ['Item', 'Price'],
            rows: [
              ['rágó', '120 Ft'],
              ['csoki', '105 Ft'],
              ['tea', '100 Ft'],
              ['kóla (0,5 l)', '250 Ft'],
              ['kávé', '120 Ft'],
              ['sajtos szendvics', '150 Ft'],
              ['pogácsa', '70 Ft'],
              ['hamburger', '275 Ft'],
            ],
          },
        ],
      },
      {
        title: 'The hard part is close contrast',
        body:
          'Beginners usually know one and two. The real memory gain comes from separating nearby forms such as negyvenöt and ötvennégy or kétszázhetvenöt and kétszázötvenhét.',
      },
    ],
    vocabulary: [
      { hungarian: 'egy', english: 'one', distractorGroup: 'unit-number' },
      { hungarian: 'kettő', english: 'two', distractorGroup: 'unit-number' },
      { hungarian: 'három', english: 'three', distractorGroup: 'unit-number' },
      { hungarian: 'négy', english: 'four', distractorGroup: 'unit-number' },
      { hungarian: 'öt', english: 'five', distractorGroup: 'unit-number' },
      { hungarian: 'hat', english: 'six', distractorGroup: 'unit-number' },
      { hungarian: 'hét', english: 'seven', distractorGroup: 'unit-number' },
      { hungarian: 'nyolc', english: 'eight', distractorGroup: 'unit-number' },
      { hungarian: 'kilenc', english: 'nine', distractorGroup: 'unit-number' },
      { hungarian: 'tíz', english: 'ten', distractorGroup: 'tens-anchor' },
      { hungarian: 'húsz', english: 'twenty', distractorGroup: 'tens-anchor' },
      { hungarian: 'harminc', english: 'thirty', distractorGroup: 'tens-anchor' },
      { hungarian: 'negyven', english: 'forty', distractorGroup: 'tens-anchor' },
      { hungarian: 'ötven', english: 'fifty', distractorGroup: 'tens-anchor' },
      { hungarian: 'száz', english: 'hundred', distractorGroup: 'large-number' },
      { hungarian: 'kétszáz', english: 'two hundred', distractorGroup: 'large-number' },
      { hungarian: 'ezer', english: 'thousand', distractorGroup: 'large-number' },
      {
        hungarian: 'hány',
        english: 'how many',
        partOfSpeech: 'question',
        distractorGroup: 'quantity-question',
      },
      {
        hungarian: 'mennyi',
        english: 'how much',
        partOfSpeech: 'question',
        distractorGroup: 'quantity-question',
      },
      {
        hungarian: 'mennyibe kerül?',
        english: 'how much does it cost?',
        partOfSpeech: 'question',
        distractorGroup: 'quantity-question',
      },
      { hungarian: 'forint', english: 'forint', distractorGroup: 'money-word' },
      { hungarian: 'olcsó', english: 'cheap', distractorGroup: 'price-opinion' },
      { hungarian: 'drága', english: 'expensive', distractorGroup: 'price-opinion' },
      {
        hungarian: 'kérek',
        english: 'I would like',
        partOfSpeech: 'phrase',
        distractorGroup: 'service-phrase',
      },
    ],
    examples: [
      {
        hungarian: 'Hány virág van itt? Kettő.',
        english: 'How many flowers are here? Two.',
        focus: 'Counting question and short answer',
      },
      {
        hungarian: 'Hány üveg van itt? Öt.',
        english: 'How many bottles are here? Five.',
        focus: 'Counting with visible objects',
      },
      {
        hungarian: 'Nyolc autó van itt.',
        english: 'There are eight cars here.',
        focus: 'Simple counting statement',
      },
      {
        hungarian: 'Negyvenöt forint.',
        english: 'Forty-five forints.',
        focus: 'Price recognition',
      },
      {
        hungarian: 'Hatszázhuszonöt forint.',
        english: 'Six hundred twenty-five forints.',
        focus: 'Larger number chunk',
      },
      {
        hungarian: 'A tea száz forint.',
        english: 'The tea is one hundred forints.',
        focus: 'Simple price statement',
      },
      {
        hungarian: 'A hamburger kétszázhetvenöt forint.',
        english: 'The hamburger is two hundred seventy-five forints.',
        focus: 'Workbook menu price',
      },
      {
        hungarian: 'Mennyibe kerül a sajtos szendvics?',
        english: 'How much is the cheese sandwich?',
        focus: 'Price question',
      },
      {
        hungarian: 'A pogácsa olcsó, a hamburger drága.',
        english: 'The scone is cheap, the hamburger is expensive.',
        focus: 'Price comparison',
      },
      {
        hungarian: 'Kérek két kávét és egy teát.',
        english: 'I would like two coffees and one tea.',
        focus: 'Order with quantities',
      },
      {
        hungarian: 'Tizenhárom meg huszonkettő az harmincöt.',
        english: 'Thirteen plus twenty-two is thirty-five.',
        focus: 'Spoken arithmetic',
      },
      {
        hungarian: 'Háromszáz forint az összesen.',
        english: 'The total is three hundred forints.',
        focus: 'Total amount',
      },
    ],
    practiceSets: [
      {
        id: 'curated-counting-money-fill',
        type: 'fill',
        title: 'Dynamic counting and money drill',
        instructions:
          'Choose the option that makes the Hungarian quantity or price pattern correct.',
        sessionSize: 12,
        questions: [
          {
            id: 'ccm1',
            prompt: 'Ask how many flowers are here.',
            template: '___ virág van itt?',
            choices: ['Hány', 'Mennyi', 'Mikor'],
            answer: 'Hány',
          },
          {
            id: 'ccm2',
            prompt: 'Answer that there are five bottles.',
            template: '- Hány üveg van itt? - ___ .',
            choices: ['Öt', 'Hat', 'Hét'],
            answer: 'Öt',
          },
          {
            id: 'ccm3',
            prompt: 'Spell the number 45.',
            template: '45 = ___ .',
            choices: ['negyvenöt', 'ötvennégy', 'negyvennégy'],
            answer: 'negyvenöt',
          },
          {
            id: 'ccm4',
            prompt: 'Spell the number 51.',
            template: '51 = ___ .',
            choices: ['ötvenegy', 'egyötven', 'ötvenhét'],
            answer: 'ötvenegy',
          },
          {
            id: 'ccm5',
            prompt: 'Spell the number 300.',
            template: '300 = ___ .',
            choices: ['háromszáz', 'harmincszáz', 'százhárom'],
            answer: 'háromszáz',
          },
          {
            id: 'ccm6',
            prompt: 'Spell the number 548.',
            template: '548 = ___ .',
            choices: ['ötszáznegyvennyolc', 'nyolcszáznegyvenöt', 'ötszáznyolcvannégy'],
            answer: 'ötszáznegyvennyolc',
          },
          {
            id: 'ccm7',
            prompt: 'Spell the number 625.',
            template: '625 = ___ .',
            choices: ['hatszázhuszonöt', 'hatszázötvenkettő', 'ötszázhuszonhat'],
            answer: 'hatszázhuszonöt',
          },
          {
            id: 'ccm8',
            prompt: 'Complete the simple tea price.',
            template: 'A tea ___ forint.',
            choices: ['száz', 'kétszáz', 'százöt'],
            answer: 'száz',
          },
          {
            id: 'ccm9',
            prompt: 'Choose the workbook hamburger price.',
            template: 'A hamburger ___ forint.',
            choices: ['kétszázhetvenöt', 'kétszázötvenhét', 'háromszázhetvenöt'],
            answer: 'kétszázhetvenöt',
          },
          {
            id: 'ccm10',
            prompt: 'Ask how much the cheese sandwich costs.',
            template: '___ kerül a sajtos szendvics?',
            choices: ['Mennyibe', 'Hány', 'Honnan'],
            answer: 'Mennyibe',
          },
          {
            id: 'ccm11',
            prompt: 'Choose the correct price opinion.',
            template: 'A pogácsa ___, a hamburger drága.',
            choices: ['olcsó', 'hosszú', 'késő'],
            answer: 'olcsó',
          },
          {
            id: 'ccm12',
            prompt: 'Order two coffees and one tea.',
            template: 'Kérek ___ kávét és egy teát.',
            choices: ['két', 'hat', 'hét'],
            answer: 'két',
          },
          {
            id: 'ccm13',
            prompt: 'Give the total if something costs three hundred forints.',
            template: '___ forint az összesen.',
            choices: ['Háromszáz', 'Harminc', 'Három'],
            answer: 'Háromszáz',
          },
          {
            id: 'ccm14',
            prompt: 'Complete the spoken sum.',
            template: 'Tizenhárom meg huszonkettő az ___ .',
            choices: ['harmincöt', 'harminchárom', 'huszonöt'],
            answer: 'harmincöt',
          },
          {
            id: 'ccm15',
            prompt: 'Choose the correct gum price from the workbook table.',
            template: 'A rágó ___ forint.',
            choices: ['százhúsz', 'száztíz', 'százöt'],
            answer: 'százhúsz',
          },
          {
            id: 'ccm16',
            prompt: 'Choose the cola price from the workbook table.',
            template: 'A kóla ___ forint.',
            choices: ['kétszázötven', 'kétszázhetvenöt', 'százötven'],
            answer: 'kétszázötven',
          },
          {
            id: 'ccm17',
            prompt: 'Count the cars: there are eight.',
            template: '___ autó van itt.',
            choices: ['Nyolc', 'Tíz', 'Kettő'],
            answer: 'Nyolc',
          },
          {
            id: 'ccm18',
            prompt: 'Choose the correct word for a price amount.',
            template: 'Kétszáz ___ .',
            choices: ['forint', 'óra', 'nyár'],
            answer: 'forint',
          },
        ],
      },
      createFlashcardPracticeSet({
        id: 'curated-counting-money-scenarios',
        title: 'Scenario flashcards for numbers and prices',
        instructions:
          'Read the cue, answer in Hungarian, then flip the card and compare.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'You say: How many flowers are here? Two.',
            answer: 'Hány virág van itt? Kettő.',
          },
          {
            scenario: 'You say: Forty-five.',
            answer: 'Negyvenöt.',
          },
          {
            scenario: 'You say: Five hundred forty-eight.',
            answer: 'Ötszáznegyvennyolc.',
          },
          {
            scenario: 'You say: Six hundred twenty-five.',
            answer: 'Hatszázhuszonöt.',
          },
          {
            scenario: 'You ask: How much is the tea?',
            answer: 'Mennyibe kerül a tea?',
          },
          {
            scenario: 'You answer: The tea is one hundred forints.',
            answer: 'A tea száz forint.',
          },
          {
            scenario: 'You answer: The hamburger is two hundred seventy-five forints.',
            answer: 'A hamburger kétszázhetvenöt forint.',
          },
          {
            scenario: 'You say: I would like two coffees and one tea.',
            answer: 'Kérek két kávét és egy teát.',
          },
          {
            scenario: 'You say: The scone is cheap.',
            answer: 'A pogácsa olcsó.',
          },
          {
            scenario: 'You say: The total is three hundred forints.',
            answer: 'Háromszáz forint az összesen.',
          },
          {
            scenario: 'You say: Thirteen plus twenty-two is thirty-five.',
            answer: 'Tizenhárom meg huszonkettő az harmincöt.',
          },
          {
            scenario: 'You say: Eight cars are here.',
            answer: 'Nyolc autó van itt.',
          },
        ]),
        sessionSize: 10,
        frontLabel: 'Situation',
        backLabel: 'Hungarian answer',
      }),
    ],
  },
  {
    id: 'curated-clock-time-routine',
    trackId: 'curated-learning',
    topics: ['time', 'routine', 'speaking'],
    level: '0 -> A1',
    phase: 'Bootcamp',
    sequence: 4,
    title: 'Clock Time and Daily Schedule',
    subtitle: 'Tell the time, read the clock, and talk through a simple day.',
    summary:
      'This lesson focuses on clock reading and time-bound routine language. You practice asking what time it is, reading Hungarian quarter and half expressions, and describing a short daily schedule such as breakfast, work, and sleep.',
    sourceUnits: ['Workbook unit 2', 'Daily routine time blocks'],
    goals: [
      'Ask and answer Hány óra van? with the basic clock patterns.',
      'Read quarter, half, and three-quarter time expressions correctly.',
      'Use time points inside daily routine sentences.',
      'Describe a short daily schedule with realistic time anchors.',
    ],
    studyFlow: [
      'Memorize the quarter and half system as chunks before trying to analyze it word by word.',
      'Read digital times and immediately say the Hungarian form aloud so the clock pattern becomes automatic.',
      'Attach real routine actions to real times from your own day instead of practicing abstract examples only.',
      'Repeat the lesson until the round changes stop feeling surprising and the time phrases stay stable anyway.',
    ],
    explanations: [
      {
        title: 'Start with one reliable question',
        body:
          'For beginner conversation you mostly need one clock question and a few answer patterns: Hány óra van?, Nyolc óra van, Negyed kilenc van, and so on.',
      },
      {
        title: 'Hungarian half and quarter time needs explicit drilling',
        body:
          'The Hungarian clock system does not map directly to English wording. Learn the whole chunk, not just the isolated words.',
        tables: [
          {
            title: 'Core clock patterns',
            columns: ['Digital', 'Hungarian'],
            rows: [
              ['8:00', 'nyolc óra van'],
              ['8:15', 'negyed kilenc van'],
              ['8:30', 'fél kilenc van'],
              ['8:45', 'háromnegyed kilenc van'],
            ],
            note:
              'fél kilenc means half of the ninth hour, so it corresponds to 8:30.',
          },
        ],
      },
      {
        title: 'Use fixed time points for routine language',
        body:
          'When you describe your day, time expressions do most of the organizational work. Nyolckor, tízkor, délben, and este tíz körül are worth memorizing whole.',
      },
      {
        title: 'Daily schedule practice should sound like a real day',
        body:
          'Short routine chains are better than isolated time labels. You remember the time more easily when it is attached to breakfast, work, dinner, or sleep.',
        tips: [
          'Reggel nyolckor reggelizek.',
          'Este tíz körül lefekszem.',
        ],
      },
    ],
    vocabulary: [
      {
        hungarian: 'hány óra van?',
        english: 'what time is it?',
        partOfSpeech: 'question',
        distractorGroup: 'time-question',
      },
      {
        hungarian: 'most',
        english: 'now',
        partOfSpeech: 'pattern',
        distractorGroup: 'time-reference',
      },
      { hungarian: 'nyolc óra', english: 'eight o’clock', distractorGroup: 'clock-expression' },
      {
        hungarian: 'negyed kilenc',
        english: 'quarter past eight',
        distractorGroup: 'clock-expression',
      },
      {
        hungarian: 'fél kilenc',
        english: 'half past eight',
        distractorGroup: 'clock-expression',
      },
      {
        hungarian: 'háromnegyed kilenc',
        english: 'quarter to nine',
        distractorGroup: 'clock-expression',
      },
      { hungarian: 'reggel', english: 'in the morning', distractorGroup: 'daypart' },
      { hungarian: 'délelőtt', english: 'before noon', distractorGroup: 'daypart' },
      { hungarian: 'délben', english: 'at noon', distractorGroup: 'daypart' },
      { hungarian: 'délután', english: 'in the afternoon', distractorGroup: 'daypart' },
      { hungarian: 'este', english: 'in the evening', distractorGroup: 'daypart' },
      { hungarian: 'éjjel', english: 'at night', distractorGroup: 'daypart' },
      { hungarian: 'nyolckor', english: 'at eight', distractorGroup: 'time-point' },
      { hungarian: 'tízkor', english: 'at ten', distractorGroup: 'time-point' },
      { hungarian: 'ötkor', english: 'at five', distractorGroup: 'time-point' },
      { hungarian: 'hétkor', english: 'at seven', distractorGroup: 'time-point' },
      { hungarian: 'huszonkét órakor', english: 'at 22:00', distractorGroup: 'time-point' },
      { hungarian: 'reggelizek', english: 'I eat breakfast', distractorGroup: 'routine-action' },
      { hungarian: 'dolgozom', english: 'I work', distractorGroup: 'routine-action' },
      { hungarian: 'ebédelek', english: 'I have lunch', distractorGroup: 'routine-action' },
      { hungarian: 'hazamegyek', english: 'I go home', distractorGroup: 'routine-action' },
      { hungarian: 'vacsorázom', english: 'I eat dinner', distractorGroup: 'routine-action' },
      { hungarian: 'lefekszem', english: 'I go to bed', distractorGroup: 'routine-action' },
      { hungarian: 'körül', english: 'around', distractorGroup: 'time-reference' },
    ],
    examples: [
      {
        hungarian: 'Most nyolc óra van.',
        english: 'It is eight o’clock now.',
        focus: 'Basic clock statement',
      },
      {
        hungarian: 'Most negyed kilenc van.',
        english: 'It is quarter past eight now.',
        focus: 'Quarter past pattern',
      },
      {
        hungarian: 'Most fél kilenc van.',
        english: 'It is half past eight now.',
        focus: 'Half past pattern',
      },
      {
        hungarian: 'Most háromnegyed kilenc van.',
        english: 'It is quarter to nine now.',
        focus: 'Quarter to pattern',
      },
      {
        hungarian: 'Reggel nyolckor reggelizek.',
        english: 'I eat breakfast at eight in the morning.',
        focus: 'Breakfast routine',
      },
      {
        hungarian: 'Délelőtt tízkor dolgozom.',
        english: 'I work at ten in the late morning.',
        focus: 'Work time',
      },
      {
        hungarian: 'Délben ebédelek.',
        english: 'I have lunch at noon.',
        focus: 'Noon routine',
      },
      {
        hungarian: 'Délután ötkor hazamegyek.',
        english: 'I go home at five in the afternoon.',
        focus: 'Going home',
      },
      {
        hungarian: 'Este hétkor vacsorázom.',
        english: 'I eat dinner at seven in the evening.',
        focus: 'Dinner time',
      },
      {
        hungarian: 'Este tíz körül lefekszem.',
        english: 'I go to bed around ten in the evening.',
        focus: 'Sleep time',
      },
      {
        hungarian: 'Éjjel csend van.',
        english: 'It is quiet at night.',
        focus: 'Night time word',
      },
      {
        hungarian: 'Hány óra van most? Fél kilenc.',
        english: 'What time is it now? Half past eight.',
        focus: 'Question and short answer',
      },
    ],
    practiceSets: [
      {
        id: 'curated-clock-time-fill',
        type: 'fill',
        title: 'Dynamic clock and schedule drill',
        instructions:
          'Choose the option that makes the clock reading or daily schedule sentence correct.',
        sessionSize: 12,
        questions: [
          {
            id: 'cct1',
            prompt: 'Ask what time it is now.',
            template: '___ van most?',
            choices: ['Hány óra', 'Mennyibe kerül', 'Hány éves'],
            answer: 'Hány óra',
          },
          {
            id: 'cct2',
            prompt: 'Read 8:00.',
            template: '8:00 = ___ .',
            choices: ['nyolc óra van', 'negyed kilenc van', 'fél kilenc van'],
            answer: 'nyolc óra van',
          },
          {
            id: 'cct3',
            prompt: 'Read 8:15.',
            template: '8:15 = ___ .',
            choices: ['negyed kilenc van', 'fél kilenc van', 'háromnegyed kilenc van'],
            answer: 'negyed kilenc van',
          },
          {
            id: 'cct4',
            prompt: 'Read 8:30.',
            template: '8:30 = ___ .',
            choices: ['fél kilenc van', 'nyolc óra van', 'negyed nyolc van'],
            answer: 'fél kilenc van',
          },
          {
            id: 'cct5',
            prompt: 'Read 8:45.',
            template: '8:45 = ___ .',
            choices: ['háromnegyed kilenc van', 'negyed kilenc van', 'fél kilenc van'],
            answer: 'háromnegyed kilenc van',
          },
          {
            id: 'cct6',
            prompt: 'Read 7:30.',
            template: '7:30 = ___ .',
            choices: ['fél nyolc van', 'fél kilenc van', 'negyed nyolc van'],
            answer: 'fél nyolc van',
          },
          {
            id: 'cct7',
            prompt: 'Choose the breakfast time.',
            template: 'Reggel ___ reggelizek.',
            choices: ['nyolckor', 'tízkor', 'délben'],
            answer: 'nyolckor',
          },
          {
            id: 'cct8',
            prompt: 'Choose the work time.',
            template: 'Délelőtt ___ dolgozom.',
            choices: ['tízkor', 'hétkor', 'éjjel'],
            answer: 'tízkor',
          },
          {
            id: 'cct9',
            prompt: 'Choose the lunch time word.',
            template: '___ ebédelek.',
            choices: ['Délben', 'Éjjel', 'Reggel'],
            answer: 'Délben',
          },
          {
            id: 'cct10',
            prompt: 'Choose the afternoon action.',
            template: 'Délután ötkor ___ .',
            choices: ['hazamegyek', 'reggelizek', 'lefekszem'],
            answer: 'hazamegyek',
          },
          {
            id: 'cct11',
            prompt: 'Choose the dinner action.',
            template: 'Este hétkor ___ .',
            choices: ['vacsorázom', 'ebédelek', 'dolgozom'],
            answer: 'vacsorázom',
          },
          {
            id: 'cct12',
            prompt: 'Choose the word for around.',
            template: 'Este tíz ___ lefekszem.',
            choices: ['körül', 'előtt', 'után'],
            answer: 'körül',
          },
          {
            id: 'cct13',
            prompt: 'Read 22:00 as a time point.',
            template: '22:00 = ___ .',
            choices: ['huszonkét órakor', 'tizenkét órakor', 'két órakor'],
            answer: 'huszonkét órakor',
          },
          {
            id: 'cct14',
            prompt: 'Choose the correct evening sentence.',
            template: 'Este tíz körül ___ .',
            choices: ['lefekszem', 'ebédelek', 'dolgozom'],
            answer: 'lefekszem',
          },
          {
            id: 'cct15',
            prompt: 'Choose the time after the afternoon.',
            template: 'Délután után ___ jön.',
            choices: ['este', 'éjjel', 'reggel'],
            answer: 'este',
          },
          {
            id: 'cct16',
            prompt: 'Choose the question answer for half past eight.',
            template: 'Hány óra van most? ___ .',
            choices: ['Fél kilenc', 'Negyed kilenc', 'Háromnegyed kilenc'],
            answer: 'Fél kilenc',
          },
          {
            id: 'cct17',
            prompt: 'Choose the correct night word.',
            template: '___ csend van.',
            choices: ['Éjjel', 'Délben', 'Reggel'],
            answer: 'Éjjel',
          },
          {
            id: 'cct18',
            prompt: 'Choose the correct quarter-to-ten reading.',
            template: '9:45 = ___ .',
            choices: ['háromnegyed tíz van', 'negyed tíz van', 'fél tíz van'],
            answer: 'háromnegyed tíz van',
          },
        ],
      },
      createFlashcardPracticeSet({
        id: 'curated-clock-time-scenarios',
        title: 'Scenario flashcards for clock time and daily routine',
        instructions:
          'Read the cue, answer in Hungarian, then flip the card and compare.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'You ask: What time is it now?',
            answer: 'Hány óra van most?',
          },
          {
            scenario: 'You say: It is eight o’clock now.',
            answer: 'Most nyolc óra van.',
          },
          {
            scenario: 'You say: It is quarter past eight now.',
            answer: 'Most negyed kilenc van.',
          },
          {
            scenario: 'You say: It is half past eight now.',
            answer: 'Most fél kilenc van.',
          },
          {
            scenario: 'You say: It is quarter to nine now.',
            answer: 'Most háromnegyed kilenc van.',
          },
          {
            scenario: 'You say: I eat breakfast at eight in the morning.',
            answer: 'Reggel nyolckor reggelizek.',
          },
          {
            scenario: 'You say: I work at ten in the late morning.',
            answer: 'Délelőtt tízkor dolgozom.',
          },
          {
            scenario: 'You say: I have lunch at noon.',
            answer: 'Délben ebédelek.',
          },
          {
            scenario: 'You say: I go home at five in the afternoon.',
            answer: 'Délután ötkor hazamegyek.',
          },
          {
            scenario: 'You say: I eat dinner at seven in the evening.',
            answer: 'Este hétkor vacsorázom.',
          },
          {
            scenario: 'You say: I go to bed around ten in the evening.',
            answer: 'Este tíz körül lefekszem.',
          },
          {
            scenario: 'You answer: Half past eight.',
            answer: 'Fél kilenc.',
          },
        ]),
        sessionSize: 10,
        frontLabel: 'Situation',
        backLabel: 'Hungarian answer',
      }),
    ],
  },
  {
    id: 'curated-dates-calendar',
    trackId: 'curated-learning',
    topics: ['dates', 'calendar', 'speaking'],
    level: '0 -> A1',
    phase: 'Bootcamp',
    sequence: 3,
    title: 'Dates, Calendar, and Seasons',
    subtitle: 'Learn weekdays, months, seasons, and the first useful date patterns.',
    summary:
      'This lesson isolates calendar language so weekdays, months, seasons, and simple date statements get enough repetition. Instead of mixing them into number practice, you drill them as a separate memory system.',
    sourceUnits: ['Workbook unit 2', 'Calendar basics'],
    goals: [
      'Recognize and produce the weekdays in order.',
      'Connect months to the correct season without stopping to translate.',
      'Say simple date statements such as Ma március tizenötödike van.',
      'Handle easy schedule questions with weekday and month answers.',
    ],
    studyFlow: [
      'Memorize weekdays as a chain, not as isolated labels, so neighboring days become automatic.',
      'Group months by season and recycle them aloud until the season-month link feels obvious.',
      'Use one or two real dates from your own life so the date pattern becomes personal and easier to remember.',
      'Repeat the lesson often and let the rotating rounds force you to separate nearby calendar words quickly.',
    ],
    explanations: [
      {
        title: 'Calendar words work in cycles',
        body:
          'Weekdays and months are easier to remember as systems. Learn what comes before and after each item instead of memorizing each word alone.',
        tables: [
          {
            title: 'Weekdays in order',
            columns: ['Order', 'Hungarian'],
            rows: [
              ['1', 'hétfő'],
              ['2', 'kedd'],
              ['3', 'szerda'],
              ['4', 'csütörtök'],
              ['5', 'péntek'],
              ['6', 'szombat'],
              ['7', 'vasárnap'],
            ],
          },
        ],
      },
      {
        title: 'Months become easier when tied to seasons',
        body:
          'Do not learn the months as twelve loose items. Pair them with weather, holidays, or routine events so each month sits inside a season.',
        tables: [
          {
            title: 'Months and seasons',
            columns: ['Season', 'Months'],
            rows: [
              ['tél', 'december, január, február'],
              ['tavasz', 'március, április, május'],
              ['nyár', 'június, július, augusztus'],
              ['ősz', 'szeptember, október, november'],
            ],
          },
        ],
      },
      {
        title: 'The first date pattern is enough for now',
        body:
          'Beginners do not need every formal calendar pattern at once. Start with short statements such as Ma március tizenötödike van and weekday answers such as Kedden.',
      },
      {
        title: 'Schedule answers recycle a few frames',
        body:
          'For early conversation, you mostly need day answers, month answers, and season answers. A small group of reliable chunks covers a lot of real use.',
        tips: [
          'Mikor van a vizsga? Kedden.',
          'A koncert szeptemberben van.',
        ],
      },
    ],
    vocabulary: [
      { hungarian: 'hétfő', english: 'Monday', distractorGroup: 'weekday' },
      { hungarian: 'kedd', english: 'Tuesday', distractorGroup: 'weekday' },
      { hungarian: 'szerda', english: 'Wednesday', distractorGroup: 'weekday' },
      { hungarian: 'csütörtök', english: 'Thursday', distractorGroup: 'weekday' },
      { hungarian: 'péntek', english: 'Friday', distractorGroup: 'weekday' },
      { hungarian: 'szombat', english: 'Saturday', distractorGroup: 'weekday' },
      { hungarian: 'vasárnap', english: 'Sunday', distractorGroup: 'weekday' },
      { hungarian: 'január', english: 'January', distractorGroup: 'month' },
      { hungarian: 'február', english: 'February', distractorGroup: 'month' },
      { hungarian: 'március', english: 'March', distractorGroup: 'month' },
      { hungarian: 'április', english: 'April', distractorGroup: 'month' },
      { hungarian: 'május', english: 'May', distractorGroup: 'month' },
      { hungarian: 'június', english: 'June', distractorGroup: 'month' },
      { hungarian: 'július', english: 'July', distractorGroup: 'month' },
      { hungarian: 'augusztus', english: 'August', distractorGroup: 'month' },
      { hungarian: 'szeptember', english: 'September', distractorGroup: 'month' },
      { hungarian: 'október', english: 'October', distractorGroup: 'month' },
      { hungarian: 'november', english: 'November', distractorGroup: 'month' },
      { hungarian: 'december', english: 'December', distractorGroup: 'month' },
      { hungarian: 'tavasz', english: 'spring', distractorGroup: 'season' },
      { hungarian: 'nyár', english: 'summer', distractorGroup: 'season' },
      { hungarian: 'ősz', english: 'autumn', distractorGroup: 'season' },
      { hungarian: 'tél', english: 'winter', distractorGroup: 'season' },
      {
        hungarian: 'ma',
        english: 'today',
        partOfSpeech: 'pattern',
        distractorGroup: 'calendar-reference',
      },
      {
        hungarian: 'holnap',
        english: 'tomorrow',
        partOfSpeech: 'pattern',
        distractorGroup: 'calendar-reference',
      },
      {
        hungarian: 'mikor?',
        english: 'when?',
        partOfSpeech: 'question',
        distractorGroup: 'calendar-reference',
      },
      {
        hungarian: 'hétvége',
        english: 'weekend',
        distractorGroup: 'calendar-reference',
      },
    ],
    examples: [
      {
        hungarian: 'Ma hétfő van.',
        english: 'Today is Monday.',
        focus: 'Simple weekday statement',
      },
      {
        hungarian: 'Holnap kedd van.',
        english: 'Tomorrow is Tuesday.',
        focus: 'Next-day pattern',
      },
      {
        hungarian: 'A találkozó pénteken van.',
        english: 'The meeting is on Friday.',
        focus: 'Schedule with weekday',
      },
      {
        hungarian: 'Szombaton és vasárnap hétvége van.',
        english: 'On Saturday and Sunday it is the weekend.',
        focus: 'Weekend pattern',
      },
      {
        hungarian: 'Január téli hónap.',
        english: 'January is a winter month.',
        focus: 'Month to season link',
      },
      {
        hungarian: 'Márciusban tavasz van.',
        english: 'In March it is spring.',
        focus: 'Season statement',
      },
      {
        hungarian: 'Júliusban nyár van.',
        english: 'In July it is summer.',
        focus: 'Summer month',
      },
      {
        hungarian: 'Októberben ősz van.',
        english: 'In October it is autumn.',
        focus: 'Autumn month',
      },
      {
        hungarian: 'Decemberben hideg van.',
        english: 'In December it is cold.',
        focus: 'Winter month scene',
      },
      {
        hungarian: 'Ma március tizenötödike van.',
        english: 'Today is March fifteenth.',
        focus: 'Date pattern',
      },
      {
        hungarian: 'A tanfolyam június harmadikán kezdődik.',
        english: 'The course starts on June third.',
        focus: 'Event date',
      },
      {
        hungarian: 'Mikor van a vizsga? Kedden.',
        english: 'When is the exam? On Tuesday.',
        focus: 'Question and short answer',
      },
    ],
    practiceSets: [
      {
        id: 'curated-dates-calendar-fill',
        type: 'fill',
        title: 'Dynamic calendar drill',
        instructions:
          'Choose the option that keeps the weekday, month, season, or date pattern correct.',
        sessionSize: 12,
        questions: [
          {
            id: 'cdc1',
            prompt: 'Say that today is Monday.',
            template: 'Ma ___ van.',
            choices: ['hétfő', 'kedd', 'péntek'],
            answer: 'hétfő',
          },
          {
            id: 'cdc2',
            prompt: 'Say that tomorrow is Tuesday.',
            template: 'Holnap ___ van.',
            choices: ['kedd', 'szerda', 'vasárnap'],
            answer: 'kedd',
          },
          {
            id: 'cdc3',
            prompt: 'Finish the weekday chain.',
            template: 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, ___ .',
            choices: ['vasárnap', 'hétfő', 'péntek'],
            answer: 'vasárnap',
          },
          {
            id: 'cdc4',
            prompt: 'Put the meeting on Friday.',
            template: 'A találkozó ___ van.',
            choices: ['pénteken', 'kedden', 'szerdán'],
            answer: 'pénteken',
          },
          {
            id: 'cdc5',
            prompt: 'Choose the month after January.',
            template: 'Január után ___ jön.',
            choices: ['február', 'március', 'december'],
            answer: 'február',
          },
          {
            id: 'cdc6',
            prompt: 'Choose the month after March.',
            template: 'Március után ___ jön.',
            choices: ['április', 'május', 'február'],
            answer: 'április',
          },
          {
            id: 'cdc7',
            prompt: 'Choose the month after May.',
            template: 'Május után ___ jön.',
            choices: ['június', 'július', 'április'],
            answer: 'június',
          },
          {
            id: 'cdc8',
            prompt: 'Choose the correct summer month.',
            template: 'Júliusban ___ van.',
            choices: ['nyár', 'tél', 'ősz'],
            answer: 'nyár',
          },
          {
            id: 'cdc9',
            prompt: 'Choose the correct autumn month.',
            template: 'Októberben ___ van.',
            choices: ['ősz', 'nyár', 'tavasz'],
            answer: 'ősz',
          },
          {
            id: 'cdc10',
            prompt: 'Choose the correct winter month.',
            template: 'Decemberben ___ van.',
            choices: ['tél', 'ősz', 'nyár'],
            answer: 'tél',
          },
          {
            id: 'cdc11',
            prompt: 'Choose the season that comes after winter.',
            template: 'A ___ a tél után jön.',
            choices: ['tavasz', 'ősz', 'nyár'],
            answer: 'tavasz',
          },
          {
            id: 'cdc12',
            prompt: 'Complete the date statement for March 15.',
            template: 'Ma március ___ van.',
            choices: ['tizenötödike', 'tizenöt', 'tizenötkor'],
            answer: 'tizenötödike',
          },
          {
            id: 'cdc13',
            prompt: 'Choose the month for the concert.',
            template: 'A koncert ___ van.',
            choices: ['szeptemberben', 'júniusban', 'szombaton'],
            answer: 'szeptemberben',
          },
          {
            id: 'cdc14',
            prompt: 'Answer the exam question with Tuesday.',
            template: 'Mikor van a vizsga? ___ .',
            choices: ['Kedden', 'Decemberben', 'Nyáron'],
            answer: 'Kedden',
          },
          {
            id: 'cdc15',
            prompt: 'Choose the correct event date.',
            template: 'A tanfolyam ___ kezdődik.',
            choices: ['június harmadikán', 'harmadik június', 'június három'],
            answer: 'június harmadikán',
          },
          {
            id: 'cdc16',
            prompt: 'Complete the weekend phrase.',
            template: 'A hétvége ___ és vasárnap.',
            choices: ['szombat', 'péntek', 'hétfő'],
            answer: 'szombat',
          },
          {
            id: 'cdc17',
            prompt: 'Choose the season for March.',
            template: 'Márciusban ___ van.',
            choices: ['tavasz', 'nyár', 'tél'],
            answer: 'tavasz',
          },
          {
            id: 'cdc18',
            prompt: 'Choose the day after Saturday.',
            template: 'Szombat után ___ jön.',
            choices: ['vasárnap', 'hétfő', 'péntek'],
            answer: 'vasárnap',
          },
        ],
      },
      createFlashcardPracticeSet({
        id: 'curated-dates-calendar-scenarios',
        title: 'Scenario flashcards for dates and calendar words',
        instructions:
          'Read the cue, answer in Hungarian, then flip the card and compare.',
        cards: buildScenarioFlashcardCards([
          {
            scenario: 'You say: Today is Monday.',
            answer: 'Ma hétfő van.',
          },
          {
            scenario: 'You say: Tomorrow is Tuesday.',
            answer: 'Holnap kedd van.',
          },
          {
            scenario: 'You say: The meeting is on Friday.',
            answer: 'A találkozó pénteken van.',
          },
          {
            scenario: 'You say: January is a winter month.',
            answer: 'Január téli hónap.',
          },
          {
            scenario: 'You say: In March it is spring.',
            answer: 'Márciusban tavasz van.',
          },
          {
            scenario: 'You say: In July it is summer.',
            answer: 'Júliusban nyár van.',
          },
          {
            scenario: 'You say: In October it is autumn.',
            answer: 'Októberben ősz van.',
          },
          {
            scenario: 'You say: Today is March fifteenth.',
            answer: 'Ma március tizenötödike van.',
          },
          {
            scenario: 'You say: The concert is in September.',
            answer: 'A koncert szeptemberben van.',
          },
          {
            scenario: 'You ask: When is the exam?',
            answer: 'Mikor van a vizsga?',
          },
          {
            scenario: 'You answer: On Tuesday.',
            answer: 'Kedden.',
          },
          {
            scenario: 'You say: The course starts on June third.',
            answer: 'A tanfolyam június harmadikán kezdődik.',
          },
        ]),
        sessionSize: 10,
        frontLabel: 'Situation',
        backLabel: 'Hungarian answer',
      }),
    ],
  },
]

export const curatedBootcampNumberLessons: Lesson[] = [...curatedBootcampNumberLessonSeed].sort(
  (left, right) =>
    (left.sequence ?? Number.MAX_SAFE_INTEGER) -
    (right.sequence ?? Number.MAX_SAFE_INTEGER),
)
