import { useState } from 'react'
import Card from './components/Card'
import { cards, deckInfo } from './data/cards'
import './App.css'

function GetRandomIndex(currentIndex, total) {
  if (total <= 1) return 0
  let nextIndex = currentIndex
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * total)
  }
  return nextIndex
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = cards[currentIndex]

  function HandleFlip() {
    setIsFlipped((flipped) => !flipped)
  }

  function HandleNext() {
    setCurrentIndex((index) => GetRandomIndex(index, cards.length))
    setIsFlipped(false)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>{deckInfo.title}</h1>
        <p className="description">{deckInfo.description}</p>
        <p className="card-count">Number of cards: {cards.length}</p>
      </header>

      <main className="main">
        <Card
          question={currentCard.question}
          answer={currentCard.answer}
          category={currentCard.category}
          image={currentCard.image}
          isFlipped={isFlipped}
          onFlip={HandleFlip}
        />

        <button type="button" className="next-button" onClick={HandleNext}>
          Next
        </button>
      </main>
    </div>
  )
}

export default App
