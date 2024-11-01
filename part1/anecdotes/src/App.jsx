import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 1,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const lengthAnecdotes = anecdotes.length;

  const randomNumber = Math.floor(Math.random() * lengthAnecdotes);
  function displayRandomAnecdote() {
    // console.log("random", randomNumber);
    setSelected(randomNumber);
  }

  function getHighestVotedAnecdote() {
    // const arrayKeysFromPoints = Object.values(pointsCopy);
    const pointsCopy = { ...points };
    const arrayValuesFromPoints = Object.values(pointsCopy);
    let valueKey = 0;
    let max = 0;
    arrayValuesFromPoints.forEach((item, index) => {
      if (item > max) {
        max = item;
        valueKey = index;
      }
    });
    console.log(pointsCopy, valueKey, ":", max);
    return valueKey;
  }

  const highestScore = getHighestVotedAnecdote();
  const [highScoreSelected, setHighScoreSelected] = useState(highestScore);
  // setHighScoreSelected(highestScore);

  function voteAnecdote() {
    const selectedCopy = selected;
    const anecdotePoints = points[selectedCopy] + 1;
    const pointsCopy = { ...points };
    pointsCopy[selected] = anecdotePoints;
    // console.log("random", randomNumber, pointsCopy, anecdotePoints);
    setPoints(pointsCopy);
    const highestScore = getHighestVotedAnecdote();
    setHighScoreSelected(highestScore);
  }
  // return <div>{anecdotes[selected]}</div>;
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{`"${anecdotes[selected]}"`}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={displayRandomAnecdote}>Next Anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <p>{`"${anecdotes[highScoreSelected]}"`}</p>
      <p>{` has ${points[highScoreSelected]} ${
        points[highScoreSelected] > 1 ? "votes" : "vote"
      }`}</p>
    </div>
  );
};

export default App;
