import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContextProvider from "./context/Context.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
