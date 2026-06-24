import { useMemo, useState } from 'react'
import Card from './components/Card'
import { cards, deckInfo } from './data/cards'
import './App.css'

function NormalizeAnswer(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function CheckAnswer(guess, answer) {
  const normalizedGuess = NormalizeAnswer(guess)
  if (!normalizedGuess) return false

  const alternatives = answer.split(/\s+or\s+/i)
  return alternatives.some((alternative) => {
    const normalizedAlternative = NormalizeAnswer(alternative)
    return (
      normalizedAlternative.includes(normalizedGuess) ||
      normalizedGuess.includes(normalizedAlternative)
    )
  })
}

function ShuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function App() {
  const [cardOrder, setCardOrder] = useState(() => cards.map((_, index) => index))
  const [masteredIds, setMasteredIds] = useState(() => new Set())
  const [position, setPosition] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [guess, setGuess] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  const activeOrder = useMemo(
    () => cardOrder.filter((id) => !masteredIds.has(id)),
    [cardOrder, masteredIds],
  )

  const currentCardIndex = activeOrder[position] ?? activeOrder[0]
  const currentCard = cards[currentCardIndex]
  const isAtStart = position === 0
  const isAtEnd = position >= activeOrder.length - 1
  const canFlip = hasSubmitted

  function ResetGuessState() {
    setGuess('')
    setHasSubmitted(false)
    setIsCorrect(false)
    setIsFlipped(false)
  }

  function HandleFlip() {
    if (!canFlip) return
    setIsFlipped((flipped) => !flipped)
  }

  function HandleSubmitGuess(event) {
    event.preventDefault()
    if (!guess.trim()) return

    const correct = CheckAnswer(guess, currentCard.answer)
    setHasSubmitted(true)
    setIsCorrect(correct)
    setIsFlipped(true)

    if (correct) {
      setCurrentStreak((streak) => {
        const nextStreak = streak + 1
        setLongestStreak((longest) => Math.max(longest, nextStreak))
        return nextStreak
      })
    } else {
      setCurrentStreak(0)
    }
  }

  function HandlePrevious() {
    if (isAtStart) return
    setPosition((index) => index - 1)
    ResetGuessState()
  }

  function HandleNext() {
    if (isAtEnd) return
    setPosition((index) => index + 1)
    ResetGuessState()
  }

  function HandleShuffle() {
    setCardOrder((order) => {
      const active = order.filter((id) => !masteredIds.has(id))
      const mastered = order.filter((id) => masteredIds.has(id))
      return [...ShuffleArray(active), ...mastered]
    })
    setPosition(0)
    ResetGuessState()
  }

  function HandleMarkMastered() {
    if (!currentCard) return

    const cardId = currentCardIndex
    setMasteredIds((ids) => new Set([...ids, cardId]))
    setPosition((index) => {
      const nextActiveCount = activeOrder.length - 1
      if (nextActiveCount <= 0) return 0
      return Math.min(index, nextActiveCount - 1)
    })
    ResetGuessState()
  }

  if (!currentCard) {
    return (
      <div className="app">
        <header className="header">
          <h1>{deckInfo.title}</h1>
          <p className="description">{deckInfo.description}</p>
          <p className="card-count">All cards mastered!</p>
          <div className="streak-stats">
            <p>Current streak: {currentStreak}</p>
            <p>Longest streak: {longestStreak}</p>
          </div>
        </header>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>{deckInfo.title}</h1>
        <p className="description">{deckInfo.description}</p>
        <p className="card-count">
          Cards remaining: {activeOrder.length} · Mastered: {masteredIds.size}
        </p>
        <div className="streak-stats">
          <p>Current streak: {currentStreak}</p>
          <p>Longest streak: {longestStreak}</p>
        </div>
      </header>

      <main className="main">
        <form className="guess-form" onSubmit={HandleSubmitGuess}>
          <label className="guess-label" htmlFor="guess-input">
            Your guess
          </label>
          <div className="guess-row">
            <input
              id="guess-input"
              className="guess-input"
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              placeholder="Type your answer..."
              disabled={hasSubmitted}
              autoComplete="off"
            />
            <button
              type="submit"
              className="submit-button"
              disabled={hasSubmitted || !guess.trim()}
            >
              Submit
            </button>
          </div>
        </form>

        {hasSubmitted && (
          <p
            className={`guess-feedback ${isCorrect ? 'guess-feedback--correct' : 'guess-feedback--incorrect'}`}
          >
            {isCorrect ? 'Correct!' : `Incorrect. Answer: ${currentCard.answer}`}
          </p>
        )}

        <Card
          question={currentCard.question}
          answer={currentCard.answer}
          category={currentCard.category}
          image={currentCard.image}
          isFlipped={isFlipped}
          canFlip={canFlip}
          onFlip={HandleFlip}
        />

        <div className="controls">
          <button
            type="button"
            className="nav-button"
            onClick={HandlePrevious}
            disabled={isAtStart}
          >
            Previous
          </button>
          <button
            type="button"
            className="nav-button"
            onClick={HandleNext}
            disabled={isAtEnd}
          >
            Next
          </button>
        </div>

        <div className="controls controls--secondary">
          <button type="button" className="action-button" onClick={HandleShuffle}>
            Shuffle
          </button>
          <button
            type="button"
            className="action-button action-button--mastered"
            onClick={HandleMarkMastered}
          >
            Mark Mastered
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
