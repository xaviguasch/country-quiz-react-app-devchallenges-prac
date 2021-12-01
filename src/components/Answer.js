import React, { useState } from 'react'

import './Answer.css'

const Answer = ({ handleOptionClick, isPending, isOptWinner, answerText }) => {
  const [isAnswerClicked, setIsAnswerClicked] = useState(false)

  const handleAnswerClick = (e) => {
    setIsAnswerClicked(true)

    handleOptionClick(e.target.innerText)
  }

  let resultStyle

  if (!isPending && isAnswerClicked) {
    isOptWinner ? (resultStyle = 'correct-pick') : (resultStyle = 'wrong-pick')
  }

  if (!isPending && !isAnswerClicked && isOptWinner) {
    resultStyle = 'correct-pick'
  }

  return (
    <div className='Answer'>
      <button onClick={handleAnswerClick} disabled={!isPending} className={resultStyle}>
        {answerText}
      </button>
    </div>
  )
}

export default Answer
