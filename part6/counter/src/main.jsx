import ReactDOM from "react-dom/client";
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

store.subscribe(() => {
  const storeNow = store.getState();
  console.log("store now", storeNow);
});

// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "ZERO" });
// store.dispatch({ type: "DECREMENT" });

// console.log(store.getState());

function App() {
  return (
    <>
      <div>Cont: {store.getState()}</div>

      <div className="card">
        <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
          plus
        </button>
        <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
          minus
        </button>
        <button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
      </div>
    </>
  );
}

// store.subscribe();

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
