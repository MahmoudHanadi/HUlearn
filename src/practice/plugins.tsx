import { useState } from 'react'
import { formatPercent } from '../lib/app-state'
import { getItemProgress, isItemDue } from './progress'
import { shuffleWithSeed } from './rng'
import type {
  ActivityOutcome,
  FlashcardActivity,
  MatchingActivity,
  MultipleChoiceActivity,
  OrderingActivity,
  PracticeActivity,
  PracticePlugin,
  PracticePluginProps,
} from './types'

function renderTemplate(template: string | undefined, selectedChoice: string | null) {
  if (!template) {
    return null
  }

  const [before, after] = template.split('___')

  return (
    <p className="sentence-preview">
      <span>{before}</span>
      <span className="sentence-blank">{selectedChoice ?? '_____'}</span>
      <span>{after}</span>
    </p>
  )
}

function rankItem(progress: PracticePluginProps<PracticeActivity>['progress'], itemId: string) {
  const entry = getItemProgress(progress, itemId)

  if (!entry) {
    return { due: 1, weakness: 2, streak: 0 }
  }

  const totalSeen = entry.correctCount + entry.wrongCount
  const accuracy = totalSeen === 0 ? 0 : entry.correctCount / totalSeen

  return {
    due: Number(isItemDue(progress, itemId)),
    weakness: 1 - accuracy,
    streak: entry.streak,
  }
}

function insertLater<T>(items: T[], value: T, offset = 2) {
  const nextItems = [...items]
  const insertionIndex = Math.min(offset, nextItems.length)
  nextItems.splice(insertionIndex, 0, value)
  return nextItems
}

function uniqueItemIds<T extends { itemId: string }>(items: T[]) {
  return [...new Set(items.map((item) => item.itemId))]
}

function resolveRoundSize(requestedSize: number | undefined, total: number) {
  return Math.min(requestedSize ?? total, total)
}

function sortReviewQuestions<T extends { itemId: string }>(
  questions: T[],
  props: PracticePluginProps<PracticeActivity>,
) {
  if (props.activity.generatorKey !== 'review_weak_mix') {
    return shuffleWithSeed(questions, `${props.activity.id}:${props.sessionKey}`)
  }

  return [...questions].sort((left, right) => {
    const leftRank = rankItem(props.progress, left.itemId)
    const rightRank = rankItem(props.progress, right.itemId)

    if (leftRank.due !== rightRank.due) {
      return rightRank.due - leftRank.due
    }

    if (leftRank.weakness !== rightRank.weakness) {
      return rightRank.weakness - leftRank.weakness
    }

    return leftRank.streak - rightRank.streak
  })
}

function buildMultipleChoiceRound(
  activity: MultipleChoiceActivity,
  progress: PracticePluginProps<PracticeActivity>['progress'],
  sessionKey: number,
) {
  const roundSize = resolveRoundSize(activity.sessionSize, activity.questions.length)

  if (roundSize === activity.questions.length) {
    return sortReviewQuestions(activity.questions, {
      activity,
      lesson: null as never,
      progress,
      sessionKey,
      onComplete: () => undefined,
      onRestart: () => undefined,
    })
  }

  if (activity.generatorKey !== 'review_weak_mix') {
    return shuffleWithSeed(activity.questions, `${activity.id}:${sessionKey}:round`).slice(0, roundSize)
  }

  const rankedQuestions = sortReviewQuestions(activity.questions, {
    activity,
    lesson: null as never,
    progress,
    sessionKey,
    onComplete: () => undefined,
    onRestart: () => undefined,
  })
  const lockedCount = Math.min(4, roundSize)
  const lockedQuestions = rankedQuestions.slice(0, lockedCount)
  const rotatingPool = rankedQuestions.slice(
    lockedCount,
    Math.min(rankedQuestions.length, roundSize * 2),
  )
  const rotatingQuestions = shuffleWithSeed(
    rotatingPool,
    `${activity.id}:${sessionKey}:review-pool`,
  ).slice(0, Math.max(0, roundSize - lockedQuestions.length))

  return shuffleWithSeed(
    [...lockedQuestions, ...rotatingQuestions],
    `${activity.id}:${sessionKey}:review-round`,
  )
}

function buildOrderingRound(activity: OrderingActivity, sessionKey: number) {
  const roundSize = resolveRoundSize(activity.sessionSize, activity.prompts.length)

  return shuffleWithSeed(activity.prompts, `${activity.id}:${sessionKey}:round`).slice(0, roundSize)
}

function ResultPanel({
  title,
  score,
  total,
  description,
  onRestart,
  scoreLabel = 'correct',
}: {
  title: string
  score: number
  total: number
  description: string
  onRestart: () => void
  scoreLabel?: string
}) {
  return (
    <section className="surface reveal">
      <div className="result-panel">
        <p className="eyebrow">Result</p>
        <h2>{title}</h2>
        <p className="result-score">
          {score}/{total} {scoreLabel}
        </p>
        <p className="hero-text">Round score: {formatPercent(total === 0 ? 0 : score / total)}</p>
        <p className="subtle-text">{description}</p>
        <button className="button-primary" onClick={onRestart} type="button">
          Try again
        </button>
      </div>
    </section>
  )
}

function MultipleChoicePlugin({
  activity,
  progress,
  sessionKey,
  onComplete,
  onRestart,
}: PracticePluginProps<MultipleChoiceActivity>) {
  const [roundQuestions] = useState(() => buildMultipleChoiceRound(activity, progress, sessionKey))
  const [queue, setQueue] = useState(() => roundQuestions)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [outcomes, setOutcomes] = useState<ActivityOutcome[]>([])
  const [firstPassCorrectIds, setFirstPassCorrectIds] = useState<string[]>([])
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const currentQuestion = queue[0]

  if (!currentQuestion) {
    return (
      <ResultPanel
        description="This activity did not produce any usable prompts."
        onRestart={onRestart}
        score={0}
        total={0}
        title="No prompts"
      />
    )
  }

  function handleNext() {
    if (!selectedChoice) {
      return
    }

    const acceptedAnswers = currentQuestion.acceptedAnswers ?? [currentQuestion.answer]
    const correct = acceptedAnswers.includes(selectedChoice)
    const nextOutcomes = [
      ...outcomes,
      {
        itemId: currentQuestion.itemId,
        correct,
      },
    ]
    const remainingQueue = queue.slice(1)
    const nextQueue = correct ? remainingQueue : insertLater(remainingQueue, currentQuestion)

    setOutcomes(nextOutcomes)

    if (correct && !outcomes.some((outcome) => outcome.itemId === currentQuestion.itemId)) {
      setFirstPassCorrectIds((previous) => [...previous, currentQuestion.itemId])
    }

    if (nextQueue.length === 0) {
      const roundItemIds = uniqueItemIds(roundQuestions)
      const score =
        firstPassCorrectIds.length +
        Number(correct && !outcomes.some((outcome) => outcome.itemId === currentQuestion.itemId))

      setFinalScore(score)
      onComplete(score, roundItemIds.length, nextOutcomes)
      return
    }

    setQueue(nextQueue)
    setSelectedChoice(null)
  }

  if (finalScore !== null) {
    return (
      <ResultPanel
        description="The round score uses first-pass correctness while weak items still recycle inside the session."
        onRestart={onRestart}
        score={finalScore}
        total={uniqueItemIds(roundQuestions).length}
        title="Practice complete"
      />
    )
  }

  const totalQuestions = uniqueItemIds(roundQuestions).length
  const currentPosition = outcomes.length + 1
  const acceptedAnswers = currentQuestion.acceptedAnswers ?? [currentQuestion.answer]
  const selectedChoiceIsCorrect =
    selectedChoice !== null && acceptedAnswers.includes(selectedChoice)
  const orderedChoices = shuffleWithSeed(
    currentQuestion.choices,
    `${activity.id}:${currentQuestion.id}:choices:${sessionKey}`,
  )

  return (
    <section className="surface reveal">
      <div className="practice-state practice-state-stacked">
        <strong>{currentQuestion.prompt}</strong>
        {currentQuestion.promptDetail ? (
          <p className="practice-prompt-detail">{currentQuestion.promptDetail}</p>
        ) : null}
        <p className="mini-label">
          Prompt {Math.min(currentPosition, totalQuestions)} of {totalQuestions}
        </p>
      </div>

      <div className="prompt-panel">
        {renderTemplate(currentQuestion.template, selectedChoice)}
        {selectedChoice ? (
          <p
            className={`feedback ${
              selectedChoiceIsCorrect
                ? 'feedback-success'
                : 'feedback-error'
            }`}
          >
            {selectedChoiceIsCorrect
              ? 'Correct.'
              : acceptedAnswers.length > 1
                ? `Accepted answers: ${acceptedAnswers.join(', ')}.`
                : `Correct answer: ${currentQuestion.answer}.`}
          </p>
        ) : (
          <p className="subtle-text">
            Choose the option that best fits the prompt and sentence pattern.
          </p>
        )}
        {selectedChoice && currentQuestion.note ? (
          <p className="helper-note">{currentQuestion.note}</p>
        ) : null}
      </div>

      <div className="choice-grid">
        {orderedChoices.map((choice) => {
          const isSelected = selectedChoice === choice
          const isCorrectChoice =
            selectedChoice !== null && acceptedAnswers.includes(choice)
          const isWrongChoice =
            selectedChoice !== null &&
            isSelected &&
            !selectedChoiceIsCorrect

          return (
            <button
              className={`choice-button ${
                isSelected ? 'choice-selected' : ''
              } ${isCorrectChoice ? 'choice-correct' : ''} ${
                isWrongChoice ? 'choice-wrong' : ''
              }`}
              disabled={selectedChoice !== null}
              key={choice}
              onClick={() => setSelectedChoice(choice)}
              type="button"
            >
              {choice}
            </button>
          )
        })}
      </div>

      <div className="practice-footer">
        <div>
          <p className="mini-label">Current score</p>
          <strong>
            {firstPassCorrectIds.length}/{totalQuestions}
          </strong>
        </div>
        <button
          className="button-primary"
          disabled={!selectedChoice}
          onClick={handleNext}
          type="button"
        >
          Next prompt
        </button>
      </div>
    </section>
  )
}

function MatchingPlugin({
  activity,
  onComplete,
  onRestart,
}: PracticePluginProps<MatchingActivity>) {
  const [leftSelection, setLeftSelection] = useState<string | null>(null)
  const [matchedLeftItems, setMatchedLeftItems] = useState<string[]>([])
  const [matchedRightItems, setMatchedRightItems] = useState<string[]>([])
  const [feedback, setFeedback] = useState<{
    tone: 'good' | 'bad'
    text: string
  } | null>(null)
  const [outcomes, setOutcomes] = useState<ActivityOutcome[]>([])
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const leftOrder = shuffleWithSeed(
    activity.pairs.map((pair) => pair.left),
    `${activity.id}:left`,
  )
  const rightOrder = shuffleWithSeed(
    activity.pairs.map((pair) => pair.right),
    `${activity.id}:right`,
  )

  function handleRightSelection(rightWord: string) {
    if (!leftSelection || matchedRightItems.includes(rightWord)) {
      return
    }

    const selectedPair = activity.pairs.find((pair) => pair.left === leftSelection)

    if (!selectedPair) {
      return
    }

    if (selectedPair.right === rightWord) {
      const nextMatchedLeft = [...matchedLeftItems, selectedPair.left]
      const nextMatchedRight = [...matchedRightItems, rightWord]
      const nextOutcomes = [...outcomes, { itemId: selectedPair.itemId, correct: true }]

      setMatchedLeftItems(nextMatchedLeft)
      setMatchedRightItems(nextMatchedRight)
      setOutcomes(nextOutcomes)
      setFeedback({ tone: 'good', text: 'Correct pair.' })
      setLeftSelection(null)

      if (nextMatchedLeft.length === activity.pairs.length) {
        setFinalScore(nextMatchedLeft.length)
        onComplete(nextMatchedLeft.length, activity.pairs.length, nextOutcomes)
      }

      return
    }

    setFeedback({
      tone: 'bad',
      text: `Try again. "${leftSelection}" matches "${selectedPair.right}".`,
    })
    setLeftSelection(null)
  }

  if (finalScore !== null) {
    return (
      <ResultPanel
        description="Matching stays as a quick consolidation mode and now still records per-item outcomes."
        onRestart={onRestart}
        score={finalScore}
        total={activity.pairs.length}
        title="Matching complete"
      />
    )
  }

  return (
    <section className="surface reveal">
      <div className="practice-state">
        <p className="mini-label">Remaining pairs</p>
        <strong>
          {activity.pairs.length - matchedLeftItems.length} of {activity.pairs.length}
        </strong>
      </div>

      <div className="matching-board">
        <div>
          <p className="mini-label">Hungarian</p>
          <div className="matching-column">
            {leftOrder.map((leftWord) => {
              const isMatched = matchedLeftItems.includes(leftWord)

              return (
                <button
                  className={`match-chip ${
                    leftSelection === leftWord ? 'match-active' : ''
                  } ${isMatched ? 'match-complete' : ''}`}
                  disabled={isMatched}
                  key={leftWord}
                  onClick={() => setLeftSelection(leftWord)}
                  type="button"
                >
                  {leftWord}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mini-label">Answer</p>
          <div className="matching-column">
            {rightOrder.map((rightWord) => {
              const isMatched = matchedRightItems.includes(rightWord)

              return (
                <button
                  className={`match-chip ${isMatched ? 'match-complete' : ''}`}
                  disabled={isMatched}
                  key={rightWord}
                  onClick={() => handleRightSelection(rightWord)}
                  type="button"
                >
                  {rightWord}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="practice-footer">
        <div>
          <p className="mini-label">Selected</p>
          <strong>{leftSelection ?? 'Choose a left-side item first'}</strong>
        </div>
        <p
          className={`feedback ${
            feedback?.tone === 'good' ? 'feedback-success' : 'feedback-error'
          }`}
        >
          {feedback ? feedback.text : 'Tap one item, then its matching pair.'}
        </p>
      </div>
    </section>
  )
}

function FlashcardPlugin({
  activity,
  sessionKey,
  onComplete,
  onRestart,
}: PracticePluginProps<FlashcardActivity>) {
  const roundSize = Math.min(
    activity.sessionSize ?? activity.cards.length,
    activity.cards.length,
  )
  const [queue, setQueue] = useState(() =>
    shuffleWithSeed(activity.cards, `${activity.id}:${sessionKey}`).slice(0, roundSize),
  )
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownOnFirstPass, setKnownOnFirstPass] = useState<string[]>([])
  const [outcomes, setOutcomes] = useState<ActivityOutcome[]>([])
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const currentCard = queue[0]

  if (!currentCard) {
    return (
      <ResultPanel
        description="This flashcard activity does not have any cards yet."
        onRestart={onRestart}
        score={0}
        total={0}
        title="No cards"
      />
    )
  }

  function advanceCard(correct: boolean) {
    if (!isFlipped) {
      return
    }

    const nextOutcomes = [...outcomes, { itemId: currentCard.itemId, correct }]
    const remainingQueue = queue.slice(1)
    const nextQueue = correct ? remainingQueue : insertLater(remainingQueue, currentCard)

    setOutcomes(nextOutcomes)

    if (correct && !outcomes.some((outcome) => outcome.itemId === currentCard.itemId)) {
      setKnownOnFirstPass((previous) => [...previous, currentCard.itemId])
    }

    if (nextQueue.length === 0) {
      const totalCards = [...new Set(activity.cards.map((card) => card.itemId))].length
      const score = knownOnFirstPass.length + Number(correct && !outcomes.some((outcome) => outcome.itemId === currentCard.itemId))

      setFinalScore(score)
      onComplete(score, totalCards, nextOutcomes)
      return
    }

    setQueue(nextQueue)
    setIsFlipped(false)
  }

  if (finalScore !== null) {
    return (
      <ResultPanel
        description="Cards marked Again recycle inside the same round, while first-pass confidence still determines the score."
        onRestart={onRestart}
        score={finalScore}
        scoreLabel="known on first pass"
        total={[...new Set(activity.cards.map((card) => card.itemId))].length}
        title="Flashcard round complete"
      />
    )
  }

  return (
    <section className="surface reveal">
      <div className="practice-state">
        <p className="mini-label">
          Card {Math.min(outcomes.length + 1, roundSize)} of {roundSize}
        </p>
        <strong>{isFlipped ? 'Rate the card and move on.' : 'Try to recall before flipping.'}</strong>
      </div>

      <div className="flashcard-stat-row">
        <span className="subtle-pill">Deck size {activity.cards.length}</span>
        <span className="subtle-pill">Known first pass {knownOnFirstPass.length}</span>
        <span className="subtle-pill">
          Marked again {outcomes.filter((outcome) => !outcome.correct).length}
        </span>
      </div>

      <button
        className={`flashcard-card ${isFlipped ? 'flashcard-card-flipped' : ''}`}
        onClick={() => setIsFlipped((value) => !value)}
        type="button"
      >
        <span className="mini-label">
          {isFlipped ? activity.backLabel ?? 'Answer' : activity.frontLabel ?? 'Prompt'}
        </span>
        <strong className="flashcard-term">
          {isFlipped ? currentCard.back : currentCard.front}
        </strong>
        <p className="flashcard-hint">
          {isFlipped
            ? 'Choose whether this card felt solid or still needs work.'
            : 'Say the answer aloud first, then flip the card.'}
        </p>
        {isFlipped && currentCard.note ? (
          <p className="helper-note">{currentCard.note}</p>
        ) : null}
      </button>

      <div className="flashcard-actions">
        <button
          className="button-secondary"
          onClick={() => setIsFlipped((value) => !value)}
          type="button"
        >
          {isFlipped ? 'Show front again' : 'Flip card'}
        </button>

        <div className="flashcard-response-row">
          <button
            className="button-secondary"
            disabled={!isFlipped}
            onClick={() => advanceCard(false)}
            type="button"
          >
            Again
          </button>
          <button
            className="button-primary"
            disabled={!isFlipped}
            onClick={() => advanceCard(true)}
            type="button"
          >
            I know this
          </button>
        </div>
      </div>
    </section>
  )
}

function OrderingPlugin({
  activity,
  sessionKey,
  onComplete,
  onRestart,
}: PracticePluginProps<OrderingActivity>) {
  const [roundPrompts] = useState(() => buildOrderingRound(activity, sessionKey))
  const [queue, setQueue] = useState(() => roundPrompts)
  const [selectedChunks, setSelectedChunks] = useState<string[]>([])
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [outcomes, setOutcomes] = useState<ActivityOutcome[]>([])
  const [firstPassCorrectIds, setFirstPassCorrectIds] = useState<string[]>([])
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const currentPrompt = queue[0]

  if (!currentPrompt) {
    return (
      <ResultPanel
        description="This ordering activity does not have any prompts yet."
        onRestart={onRestart}
        score={0}
        total={0}
        title="No prompts"
      />
    )
  }

  const bankChunks = shuffleWithSeed(
    currentPrompt.answerChunks,
    `${currentPrompt.id}:bank:${sessionKey}`,
  ).filter((chunk) => !selectedChunks.includes(chunk))

  function submitAnswer() {
    const correct =
      selectedChunks.join(' ').trim() === currentPrompt.answerChunks.join(' ').trim()
    const nextOutcomes = [...outcomes, { itemId: currentPrompt.itemId, correct }]
    const remainingQueue = queue.slice(1)
    const nextQueue = correct ? remainingQueue : insertLater(remainingQueue, currentPrompt)

    setOutcomes(nextOutcomes)
    setFeedback(correct)

    if (correct && !outcomes.some((outcome) => outcome.itemId === currentPrompt.itemId)) {
      setFirstPassCorrectIds((previous) => [...previous, currentPrompt.itemId])
    }

    window.setTimeout(() => {
      if (nextQueue.length === 0) {
        const total = uniqueItemIds(roundPrompts).length
        const score =
          firstPassCorrectIds.length +
          Number(correct && !outcomes.some((outcome) => outcome.itemId === currentPrompt.itemId))

        setFinalScore(score)
        onComplete(score, total, nextOutcomes)
        return
      }

      setQueue(nextQueue)
      setSelectedChunks([])
      setFeedback(null)
    }, 200)
  }

  if (finalScore !== null) {
    return (
      <ResultPanel
        description="Ordering reinforces chunking and still recycles weak sentences when needed."
        onRestart={onRestart}
        score={finalScore}
        total={uniqueItemIds(roundPrompts).length}
        title="Sentence builder complete"
      />
    )
  }

  return (
    <section className="surface reveal">
      <div className="practice-state practice-state-stacked">
        <strong>{currentPrompt.prompt}</strong>
        <p className="mini-label">Build the Hungarian sentence in the correct order.</p>
      </div>

      <div className="prompt-panel">
        <div className="ordering-response">
          {selectedChunks.length > 0 ? (
            selectedChunks.map((chunk, index) => (
              <button
                className="match-chip match-active"
                key={`${chunk}-${index}`}
                onClick={() =>
                  setSelectedChunks((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
                }
                type="button"
              >
                {chunk}
              </button>
            ))
          ) : (
            <p className="subtle-text">Select chunks below to build the sentence.</p>
          )}
        </div>
        {feedback !== null ? (
          <p className={`feedback ${feedback ? 'feedback-success' : 'feedback-error'}`}>
            {feedback
              ? 'Correct order.'
              : `Correct answer: ${currentPrompt.answerChunks.join(' ')}.`}
          </p>
        ) : null}
        {currentPrompt.note ? <p className="helper-note">{currentPrompt.note}</p> : null}
      </div>

      <div className="choice-grid">
        {bankChunks.map((chunk) => (
          <button
            className="choice-button"
            key={chunk}
            onClick={() => setSelectedChunks((previous) => [...previous, chunk])}
            type="button"
          >
            {chunk}
          </button>
        ))}
      </div>

      <div className="practice-footer">
        <button
          className="button-secondary"
          disabled={selectedChunks.length === 0}
          onClick={() => setSelectedChunks([])}
          type="button"
        >
          Clear
        </button>
        <button
          className="button-primary"
          disabled={selectedChunks.length !== currentPrompt.answerChunks.length}
          onClick={submitAnswer}
          type="button"
        >
          Check order
        </button>
      </div>
    </section>
  )
}

export const practicePlugins: PracticePlugin[] = [
  {
    type: 'flashcards',
    label: 'Flashcards',
    render: (props) => <FlashcardPlugin {...props} activity={props.activity as FlashcardActivity} />,
  },
  {
    type: 'matching',
    label: 'Matching',
    render: (props) => <MatchingPlugin {...props} activity={props.activity as MatchingActivity} />,
  },
  {
    type: 'multiple-choice',
    label: 'Multiple choice',
    render: (props) => (
      <MultipleChoicePlugin {...props} activity={props.activity as MultipleChoiceActivity} />
    ),
  },
  {
    type: 'ordering',
    label: 'Sentence builder',
    render: (props) => <OrderingPlugin {...props} activity={props.activity as OrderingActivity} />,
  },
]
