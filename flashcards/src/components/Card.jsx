function Card({ question, answer, category, image, isFlipped, canFlip, onFlip }) {
  function HandleClick() {
    if (!canFlip) return
    onFlip()
  }

  function HandleKeyDown(event) {
    if (!canFlip) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onFlip()
    }
  }

  return (
    <div
      className={`card card--${category.toLowerCase()}${canFlip ? '' : ' card--locked'}`}
      onClick={HandleClick}
      role="button"
      tabIndex={canFlip ? 0 : -1}
      aria-disabled={!canFlip}
      onKeyDown={HandleKeyDown}
    >
      <p className="card-label">{isFlipped ? 'ANSWER' : 'QUESTION'}</p>
      {image && <img src={image} alt="" className="card-image" />}
      <p className="card-text">{isFlipped ? answer : question}</p>
      {!canFlip && <p className="card-hint">Submit a guess to reveal the answer</p>}
    </div>
  )
}

export default Card
