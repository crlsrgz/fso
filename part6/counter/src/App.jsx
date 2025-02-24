import { useState } from "react";
import "./App.css";

import { createStore } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default: // if none of the above matches, code comes here
      return state;
  }
};

const store = createStore(counterReducer);

console.log(store.getState());
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
console.log(store.getState());
store.dispatch({ type: "ZERO" });
store.dispatch({ type: "DECREMENT" });
console.log(store.getState());

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>{count}</div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>plus</button>
        <button
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
        >
          minus
        </button>
        <button onClick={() => setCount(0)}>zero</button>
      </div>
    </>
  );
}

export default App;
