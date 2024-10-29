import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function Button({onSmash, text}){
    console.log("click")
    return(
      <button onClick={onSmash}>{text}</button>
    )
  }
  
  const increaseCount = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <header>
        <h2>Give feedback</h2>
      </header>
      <div>
        <Button onSmash={increaseCount} text={"good"} />
        <Button onSmash={increaseNeutral} text={"neutral"} />
        <Button onSmash={increaseBad} text={"bad"} />

      </div>

      <div>
        <h2>statistics</h2>
        <p><span>good </span><span>{good}</span></p>
        <p><span>netral </span><span>{neutral}</span></p>
        <p><span>bad </span><span>{bad}</span></p>
      </div>
    </div>
  )
}

export default App;