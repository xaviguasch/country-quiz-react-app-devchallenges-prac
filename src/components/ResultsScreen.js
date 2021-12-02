import React from 'react'

import './ResultsScreen.css'

const ResultScreen = ({ pointsCounter, resetGame }) => {
  const resultBtnHandler = () => {
    resetGame()
  }

  return (
    <div className='ResultScreen'>
      <h2>This is the result screen</h2>
      <h2>Finished game. {pointsCounter} points</h2>
      <button onClick={resultBtnHandler}>Try Again</button>
    </div>
  )
}

export default ResultScreen
