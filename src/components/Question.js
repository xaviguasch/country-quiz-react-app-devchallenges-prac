import React from 'react'

import Answer from './Answer'

import './Question.css'

const Question = ({ currentQ, checkResult, isQPending }) => {
  const handleOptionClick = (location) => {
    checkResult(location)

    console.log(location)
  }

  return (
    <div className='Question'>
      <h2>{currentQ.questionStr}</h2>
      <ul>
        {currentQ.options.map((opt) => {
          let isOptWinner
          currentQ.winner === opt ? (isOptWinner = true) : (isOptWinner = false)

          return (
            <li key={opt}>
              <Answer
                handleOptionClick={handleOptionClick}
                isPending={isQPending}
                isOptWinner={isOptWinner}
                answerText={opt}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Question
