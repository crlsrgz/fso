import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>The app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });

  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  /**
   * handleLeftClick
   * set the clicks spreading the object values,then modifies the the click value
   * Instead of using push, that mutates the array the concat method returns a new array
   * updateLeft creates a copy and then is used to set the left and set the total
   */
  const handleLeftClick = () => {
    const updateLeft = clicks.left + 1;
    setAll(allClicks.concat("L"));
    setClicks({ ...clicks, left: updateLeft });
    setTotal(updateLeft + clicks.right);
  };

  const handleRightClick = () => {
    const updateRight = clicks.right + 1;
    setAll(allClicks.concat("R"));
    setClicks({ ...clicks, right: updateRight });
    setTotal(clicks.left + updateRight);
  };

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text={"left"} />
      <Button handleClick={handleRightClick} text={"right"} />
      {clicks.right}
      <History allClicks={allClicks} />
      <p>Total {total}</p>
    </div>
  );
};

export default App;
