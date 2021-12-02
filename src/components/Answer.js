import React, { useState } from 'react'

import './Answer.css'

const Answer = ({ handleOptionClick, isPending, isOptWinner, answerText, letter }) => {
  const [isAnswerClicked, setIsAnswerClicked] = useState(false)

  const handleAnswerClick = (e) => {
    setIsAnswerClicked(true)

    handleOptionClick(answerText)
  }

  let resultStyle
  let resultIcon = <span></span>

  if (!isPending && isAnswerClicked) {
    if (isOptWinner) {
      resultStyle = 'correct-pick'
      resultIcon = <span className='material-icons-round'>check_circle_outline</span>
    } else {
      resultStyle = 'wrong-pick'
      resultIcon = <span className='material-icons-round'>highlight_off</span>
    }
  }

  if (!isPending && !isAnswerClicked && isOptWinner) {
    resultStyle = 'correct-pick'
    resultIcon = <span className='material-icons-round'>check_circle_outline</span>
  }

  return (
    <div className='Answer'>
      <button
        onClick={handleAnswerClick}
        disabled={!isPending}
        className={`btn btn--answer ${resultStyle}`}
      >
        <span className='answer__letter'>{letter}</span>
        <span className='answer__answer-text'>{answerText}</span>
        {resultIcon}
      </button>
    </div>
  )
}

export default Answer
