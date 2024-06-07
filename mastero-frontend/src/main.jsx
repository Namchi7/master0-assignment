// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import App from "./App.jsx";
import "./index.css";

const theme = createTheme({
  palette: {
    start: {
      main: "#27eb27",
      contrastText: "#007200",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "2rem",
      fontWeight: "700",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    h4: {
      fontSize: "1.1rem",
      fontWeight: "500",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>
  // </React.StrictMode>
);
