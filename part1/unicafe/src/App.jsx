import { useState } from "react";

function Button({ onSmash, text }) {
  return <button onClick={onSmash}>{text}</button>;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [allPoints, setAllPoints] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  function calculateValues(good, neutral, bad) {
    const calcAll = good + neutral + bad;
    const calcAverage = (good - bad) / calcAll;
    const calcPositive = (good / calcAll) * 100;

    console.log(good, neutral, bad);
    console.log(calcAll, calcAverage, calcPositive);

    setAllPoints(calcAll);
    setAverage(calcAverage);
    setPositive(calcPositive);
  }

  const increaseCount = () => {
    const incrementeGood = good + 1;
    setGood(incrementeGood);
    calculateValues(incrementeGood, neutral, bad);
  };
  const increaseNeutral = () => {
    const incrementNeutral = neutral + 1;
    setNeutral(incrementNeutral);
    calculateValues(good, incrementNeutral, bad);
  };
  const increaseBad = () => {
    const incrementBad = bad + 1;
    setBad(incrementBad);
    calculateValues(good, neutral, incrementBad);
  };

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
        <p>
          <span>good </span>
          <span>{good}</span>
        </p>
        <p>
          <span>neutral </span>
          <span>{neutral}</span>
        </p>
        <p>
          <span>bad </span>
          <span>{bad}</span>
        </p>
        <p>
          <span>all </span>
          <span>{allPoints}</span>
        </p>
        <p>
          <span>average </span>
          <span>{average}</span>
        </p>
        <p>
          <span>positive </span>
          <span>{positive} %</span>
        </p>
      </div>
    </div>
  );
};

export default App;
