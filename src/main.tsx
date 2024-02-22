import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ChatProvider from "./context/chatContext.tsx";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "black" },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Toaster />
          <App />
        </ThemeProvider>
      </Router>
    </ChatProvider>
  </React.StrictMode>
);
