import { useState } from "react";

function Button({ onSmash, text }) {
  return <button onClick={onSmash}>{text}</button>;
}

function StatisticLine(props) {
  return (
    <tr>
      <td>{props.text} </td>
      <td>
        {props.value} <span>{props.symbol === true ? " %" : ""}</span>
      </td>
    </tr>
  );
}

function Statistics(props) {
  if (props.allPoints <= 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={props.good} />
          <StatisticLine text={"neutral"} value={props.neutral} />
          <StatisticLine text={"good"} value={props.bad} />
          <StatisticLine text={"good"} value={props.allPoints} />
          <StatisticLine text={"good"} value={props.average} />
          <StatisticLine
            text={"positive"}
            value={props.positive}
            symbol={true}
          />
        </tbody>
      </table>
    </>
  );
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allPoints={allPoints}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
