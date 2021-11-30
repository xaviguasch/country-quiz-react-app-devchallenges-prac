import React from 'react'

import './Question.css'

const Question = ({ currentQ, checkResult, isQPending }) => {
  const handleOptionClick = (e) => {
    checkResult(e.target.innerText)
  }

  return (
    <div className='Question'>
      <h2>{currentQ.questionStr}</h2>
      {currentQ.options.map((opt) => {
        let isOptWinner
        currentQ.winner === opt ? (isOptWinner = true) : (isOptWinner = false)

        return (
          <li key={opt}>
            <button
              onClick={handleOptionClick}
              disabled={!isQPending}
              isOptWinner={isOptWinner}
            >
              {opt}
            </button>
          </li>
        )
      })}
    </div>
  )
}

export default Question
