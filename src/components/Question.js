import React from 'react'

import Answer from './Answer'

import './Question.css'

const Question = ({ currentQ, checkResult, isQPending }) => {
  const handleOptionClick = (location) => {
    checkResult(location)
  }

  const letters = ['a', 'b', 'c', 'd']
  let i = 0

  return (
    <div className='Question'>
      <p className='question-text'>{currentQ.questionStr}</p>

      <ul className='answers-list'>
        {currentQ.options.map((opt) => {
          let isOptWinner
          currentQ.winner === opt ? (isOptWinner = true) : (isOptWinner = false)
          const currLetter = letters[i]
          i++

          return (
            <li key={opt}>
              <Answer
                letter={currLetter}
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
