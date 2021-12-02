import React, { useState, useEffect } from 'react'

import Question from './components/Question'
import ResultsScreen from './components/ResultsScreen'

import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [qs, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState([])
  const [gameStarted, setGameStart] = useState(false)
  const [qPending, setQPending] = useState(true)
  const [pointsCounter, setPointsCounter] = useState(0)
  const [qNumber, setQNumber] = useState(0)
  const [finishedGame, setFinishedGame] = useState(false)

  const totalNumQs = 5

  useEffect(() => {
    getCountries()
  }, [])

  //Schwartzian transform implementation, returns the shuffled array
  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const getCountries = () => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag')
      .then((res) => res.json())
      .then((data) => setCountries(data))
  }

  const checkResult = (location) => {
    setQPending(false)

    if (location === currentQ.winner) {
      setPointsCounter((prevState) => prevState + 1)
    }
  }

  const moveToNextQ = () => {
    if (qNumber < qs.length - 1) {
      console.log(qNumber)
      setQPending(true)
      setQNumber(qNumber + 1)
      setCurrentQ((prev) => qs[qNumber + 1])
    } else {
      console.log('end game')
      setFinishedGame(true)
    }
  }

  const generateQuestions = () => {
    let questions = []

    for (let i = 0; i < totalNumQs; i++) {
      const selections = shuffleArray(countries).slice(0, 4)
      const winner = selections[Math.floor(Math.random() * selections.length)]

      const questionType = Math.random() >= 0.5 // Random binary return: true "capital"/false "flag"

      let questionStr
      let options = []

      if (questionType) {
        questionStr = `${winner.capital[0]} is the capital of`

        selections.forEach((sel) => options.push(sel.name.common))
      } else {
        questionStr = `${winner.flag} Which country does this flag belong to?`

        selections.forEach((sel) => options.push(sel.name.common))
      }

      questions.push({
        id: i,
        questionStr,
        options,
        winner: winner.name.common,
      })
    }

    // General reset, necessary when playing more than one game
    setQPending(true)
    setQNumber(0)
    setPointsCounter(0)
    setGameStart(true)
    setQuestions(questions)
    setCurrentQ(questions[0])
  }

  const resetGameHandler = () => {
    setFinishedGame(false)
    getCountries()
    generateQuestions()
  }

  return (
    <div className='App'>
      <h1>Country Quizz</h1>
      {!gameStarted && <button onClick={generateQuestions}>Start!</button>}
      {gameStarted && !finishedGame && (
        <Question currentQ={currentQ} checkResult={checkResult} isQPending={qPending} />
      )}

      {!qPending && !finishedGame && <button onClick={moveToNextQ}>Next</button>}

      {finishedGame && (
        <ResultsScreen pointsCounter={pointsCounter} resetGame={resetGameHandler} />
      )}
    </div>
  )
}

export default App
