import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { StrictMode } from "react";
import Title from "./components/Title.components.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
