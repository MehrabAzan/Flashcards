function Card({ question, answer, category, image, isFlipped, onFlip }) {
  return (
    <div
      className={`card card--${category.toLowerCase()}`}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onFlip()
        }
      }}
    >
      <p className="card-label">{isFlipped ? 'ANSWER' : 'QUESTION'}</p>
      {image && <img src={image} alt="" className="card-image" />}
      <p className="card-text">{isFlipped ? answer : question}</p>
    </div>
  )
}

export default Card
