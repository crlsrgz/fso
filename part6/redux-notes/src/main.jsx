import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createStore } from "redux";
/* Application is wraped in the Provider */
import { Provider } from "react-redux";
import noteReducer from "./reducers/noteReducer.js";

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "App state in redus",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
