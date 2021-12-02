import React from 'react'

import './ResultsScreen.css'

const ResultScreen = ({ pointsCounter, resetGame }) => {
  const resultBtnHandler = () => {
    resetGame()
  }

  return (
    <div className='ResultScreen'>
      <div className='results__text-area'>
        <h2 className='results-title'>Results</h2>
        <p className='results-text'>
          You got <span className='final-result-num'>{pointsCounter}</span> correct
          answers.
        </p>
      </div>
      <div className='results__btn-area'>
        <button className='btn btn--try-again' onClick={resultBtnHandler}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ResultScreen
