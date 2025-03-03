import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createStore } from "redux";
/* Application is wraped in the Provider */
import { Provider } from "react-redux";
import noteReducer from "./reducers/noteReducer.js";

const store = createStore(noteReducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
