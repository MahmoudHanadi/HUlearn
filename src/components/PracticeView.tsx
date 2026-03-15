import { useState } from 'react'
import type {
  FlashcardPracticeSet,
  FillPracticeSet,
  Lesson,
  MatchPracticeSet,
  PracticeSet,
} from '../content/types'
import {
  formatPercent,
  getPracticeProgress,
  shuffle,
  type ProgressState,
} from '../lib/app-state'
import { MetaBlock } from './atoms'

function getPracticeTypeLabel(practiceSet: PracticeSet) {
  switch (practiceSet.type) {
    case 'fill':
      return 'Fill the blank'
    case 'match':
      return 'Match meaning'
    case 'flashcards':
      return 'Flashcards'
  }
}

interface PracticeViewProps {
  lesson: Lesson
  practiceSet: PracticeSet
  progress: ProgressState
  onBack: () => void
  onComplete: (practiceId: string, score: number, total: number) => void
}

function renderTemplate(template: string, selectedChoice: string | null) {
  const [before, after] = template.split('___')

  return (
    <p className="sentence-preview">
      <span>{before}</span>
      <span className="sentence-blank">{selectedChoice ?? '_____'}</span>
      <span>{after}</span>
    </p>
  )
}

export function PracticeView({
  lesson,
  practiceSet,
  progress,
  onBack,
  onComplete,
}: PracticeViewProps) {
  const [sessionKey, setSessionKey] = useState(0)
  const entry = getPracticeProgress(progress, practiceSet.id)

  return (
    <>
      <section className={`surface reveal track-frame track-${lesson.trackId}`}>
        <div className="hero-actions">
          <button className="button-secondary" onClick={onBack} type="button">
            Back to lesson portal
          </button>
          <span className={`badge track-badge track-${lesson.trackId}`}>
            {getPracticeTypeLabel(practiceSet)}
          </span>
        </div>

        <div className="practice-header-copy">
          <p className="eyebrow">{lesson.title}</p>
          <h1>{practiceSet.title}</h1>
          <p className="hero-text">{practiceSet.instructions}</p>
        </div>

        <div className="portal-meta-grid">
          <MetaBlock
            label="Best score"
            value={formatPercent(entry ? entry.bestScore : null)}
          />
          <MetaBlock
            label="Last score"
            value={formatPercent(entry ? entry.lastScore : null)}
          />
          <MetaBlock
            label="Attempts"
            value={entry ? String(entry.attempts) : '0'}
          />
        </div>
      </section>

      {practiceSet.type === 'fill' ? (
        <FillPracticePanel
          key={`${practiceSet.id}-${sessionKey}`}
          onComplete={(score, total) => onComplete(practiceSet.id, score, total)}
          onRestart={() => setSessionKey((value) => value + 1)}
          practiceSet={practiceSet}
        />
      ) : practiceSet.type === 'match' ? (
        <MatchPracticePanel
          key={`${practiceSet.id}-${sessionKey}`}
          onComplete={(score, total) => onComplete(practiceSet.id, score, total)}
          onRestart={() => setSessionKey((value) => value + 1)}
          practiceSet={practiceSet}
        />
      ) : (
        <FlashcardPracticePanel
          key={`${practiceSet.id}-${sessionKey}`}
          onComplete={(score, total) => onComplete(practiceSet.id, score, total)}
          onRestart={() => setSessionKey((value) => value + 1)}
          practiceSet={practiceSet}
        />
      )}
    </>
  )
}

interface FillPracticePanelProps {
  practiceSet: FillPracticeSet
  onComplete: (score: number, total: number) => void
  onRestart: () => void
}

function FillPracticePanel({
  practiceSet,
  onComplete,
  onRestart,
}: FillPracticePanelProps) {
  const [shuffledChoices] = useState(() =>
    practiceSet.questions.map((question) => shuffle(question.choices)),
  )
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const currentQuestion = practiceSet.questions[questionIndex]
  const currentChoices = shuffledChoices[questionIndex]

  function handleNext() {
    if (!selectedChoice) {
      return
    }

    const nextScore = score + Number(selectedChoice === currentQuestion.answer)

    if (questionIndex === practiceSet.questions.length - 1) {
      setScore(nextScore)
      setFinalScore(nextScore)
      onComplete(nextScore, practiceSet.questions.length)
      return
    }

    setScore(nextScore)
    setQuestionIndex((index) => index + 1)
    setSelectedChoice(null)
  }

  if (finalScore !== null) {
    return (
      <ResultPanel
        description="You can rerun the set immediately or go back to the lesson portal."
        onRestart={onRestart}
        score={finalScore}
        scoreLabel="correct"
        title="Practice complete"
        total={practiceSet.questions.length}
      />
    )
  }

  return (
    <section className="surface reveal">
      <div className="practice-state">
        <p className="mini-label">
          Question {questionIndex + 1} of {practiceSet.questions.length}
        </p>
        <strong>{currentQuestion.prompt}</strong>
      </div>

      <div className="prompt-panel">
        {renderTemplate(currentQuestion.template, selectedChoice)}
        {selectedChoice ? (
          <p
            className={`feedback ${
              selectedChoice === currentQuestion.answer
                ? 'feedback-success'
                : 'feedback-error'
            }`}
          >
            {selectedChoice === currentQuestion.answer
              ? 'Correct.'
              : `Correct answer: ${currentQuestion.answer}.`}
          </p>
        ) : (
          <p className="subtle-text">
            Tap the word or ending that best completes the sentence.
          </p>
        )}
        {selectedChoice && currentQuestion.note ? (
          <p className="helper-note">{currentQuestion.note}</p>
        ) : null}
      </div>

      <div className="choice-grid">
        {currentChoices.map((choice) => {
          const isSelected = selectedChoice === choice
          const isCorrectChoice =
            selectedChoice !== null && choice === currentQuestion.answer
          const isWrongChoice =
            selectedChoice !== null &&
            isSelected &&
            selectedChoice !== currentQuestion.answer

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
            {score}/{practiceSet.questions.length}
          </strong>
        </div>
        <button
          className="button-primary"
          disabled={!selectedChoice}
          onClick={handleNext}
          type="button"
        >
          {questionIndex === practiceSet.questions.length - 1
            ? 'Finish set'
            : 'Next question'}
        </button>
      </div>
    </section>
  )
}

interface MatchPracticePanelProps {
  practiceSet: MatchPracticeSet
  onComplete: (score: number, total: number) => void
  onRestart: () => void
}

function MatchPracticePanel({
  practiceSet,
  onComplete,
  onRestart,
}: MatchPracticePanelProps) {
  const [leftSelection, setLeftSelection] = useState<string | null>(null)
  const [matchedLeftItems, setMatchedLeftItems] = useState<string[]>([])
  const [matchedRightItems, setMatchedRightItems] = useState<string[]>([])
  const [feedback, setFeedback] = useState<{
    tone: 'good' | 'bad'
    text: string
  } | null>(null)
  const [score, setScore] = useState(0)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [leftOrder] = useState(() =>
    shuffle(practiceSet.pairs.map((pair) => pair.left)),
  )
  const [rightOrder] = useState(() =>
    shuffle(practiceSet.pairs.map((pair) => pair.right)),
  )

  function handleRightSelection(rightWord: string) {
    if (!leftSelection || matchedRightItems.includes(rightWord)) {
      return
    }

    const selectedPair = practiceSet.pairs.find(
      (pair) => pair.left === leftSelection,
    )

    if (!selectedPair) {
      return
    }

    if (selectedPair.right === rightWord) {
      const nextScore = score + 1
      const nextMatchedLeft = [...matchedLeftItems, selectedPair.left]
      const nextMatchedRight = [...matchedRightItems, rightWord]

      setMatchedLeftItems(nextMatchedLeft)
      setMatchedRightItems(nextMatchedRight)
      setScore(nextScore)
      setFeedback({ tone: 'good', text: 'Correct pair.' })
      setLeftSelection(null)

      if (nextScore === practiceSet.pairs.length) {
        setFinalScore(nextScore)
        onComplete(nextScore, practiceSet.pairs.length)
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
        description="This set is tuned for quick repetition, so rerunning it is useful."
        onRestart={onRestart}
        score={finalScore}
        scoreLabel="correct"
        title="Matching complete"
        total={practiceSet.pairs.length}
      />
    )
  }

  return (
    <section className="surface reveal">
      <div className="practice-state">
        <p className="mini-label">Remaining pairs</p>
        <strong>
          {practiceSet.pairs.length - matchedLeftItems.length} of{' '}
          {practiceSet.pairs.length}
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
          <p className="mini-label">English</p>
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
          <strong>{leftSelection ?? 'Choose a Hungarian item first'}</strong>
        </div>
        <p
          className={`feedback ${
            feedback?.tone === 'good' ? 'feedback-success' : 'feedback-error'
          }`}
        >
          {feedback
            ? feedback.text
            : 'Tap one Hungarian item, then its English meaning.'}
        </p>
      </div>
    </section>
  )
}

interface FlashcardPracticePanelProps {
  practiceSet: FlashcardPracticeSet
  onComplete: (score: number, total: number) => void
  onRestart: () => void
}

function FlashcardPracticePanel({
  practiceSet,
  onComplete,
  onRestart,
}: FlashcardPracticePanelProps) {
  const roundSize = Math.min(
    practiceSet.sessionSize ?? practiceSet.cards.length,
    practiceSet.cards.length,
  )
  const [roundCards] = useState(() =>
    shuffle(practiceSet.cards).slice(0, roundSize),
  )
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCount, setKnownCount] = useState(0)
  const [againCount, setAgainCount] = useState(0)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const currentCard = roundCards[cardIndex]

  function advanceCard(didKnowCard: boolean) {
    if (!isFlipped) {
      return
    }

    const nextKnownCount = knownCount + Number(didKnowCard)

    setKnownCount(nextKnownCount)

    if (!didKnowCard) {
      setAgainCount((value) => value + 1)
    }

    if (cardIndex === roundCards.length - 1) {
      setFinalScore(nextKnownCount)
      onComplete(nextKnownCount, roundCards.length)
      return
    }

    setCardIndex((value) => value + 1)
    setIsFlipped(false)
  }

  if (finalScore !== null) {
    return (
      <ResultPanel
        description="Flashcard rounds are designed for immediate repetition. Shuffle another round and keep going while the weak cards are still fresh."
        onRestart={onRestart}
        score={finalScore}
        scoreLabel="marked known"
        title="Flashcard round complete"
        total={roundCards.length}
      />
    )
  }

  return (
    <section className="surface reveal">
      <div className="practice-state">
        <p className="mini-label">
          Card {cardIndex + 1} of {roundCards.length}
        </p>
        <strong>{isFlipped ? 'Rate the card and move on.' : 'Try to recall before flipping.'}</strong>
      </div>

      <div className="flashcard-stat-row">
        <span className="subtle-pill">Deck size {practiceSet.cards.length}</span>
        <span className="subtle-pill">Known this round {knownCount}</span>
        <span className="subtle-pill">Marked again {againCount}</span>
      </div>

      <button
        className={`flashcard-card ${isFlipped ? 'flashcard-card-flipped' : ''}`}
        onClick={() => setIsFlipped((value) => !value)}
        type="button"
      >
        <span className="mini-label">
          {isFlipped
            ? practiceSet.backLabel ?? 'Meaning'
            : practiceSet.frontLabel ?? 'Hungarian'}
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

interface ResultPanelProps {
  title: string
  score: number
  total: number
  description: string
  onRestart: () => void
  scoreLabel?: string
}

function ResultPanel({
  title,
  score,
  total,
  description,
  onRestart,
  scoreLabel = 'correct',
}: ResultPanelProps) {
  const ratio = score / total

  return (
    <section className="surface reveal">
      <div className="result-panel">
        <p className="eyebrow">Result</p>
        <h2>{title}</h2>
        <p className="result-score">
          {score}/{total} {scoreLabel}
        </p>
        <p className="hero-text">Round score: {formatPercent(ratio)}</p>
        <p className="subtle-text">{description}</p>
        <button className="button-primary" onClick={onRestart} type="button">
          Try again
        </button>
      </div>
    </section>
  )
}
