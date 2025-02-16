import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
//Modern Normalize
import "modern-normalize/modern-normalize.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
