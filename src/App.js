import React, { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [countries, setCountries] = useState()

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

  const generateQuestion = () => {
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
        questionStr = `${winner.flag}&Which country does this flag belong to?`

        selections.forEach((sel) => options.push(sel.name.common))
      }

      questions.push({
        id: i,
        questionStr,
        options,
        winner: winner.name.common,
      })
    }

    console.log(questions)
  }

  return (
    <div className='App'>
      <h1>Country Quizz</h1>
      <button onClick={generateQuestion}>Generate!</button>
    </div>
  )
}

export default App
