import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext.tsx";
import ChatsProvider from "./context/ChatContext.tsx";
import SocketProvider from "./context/SocketContext.tsx";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "black" },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Router>
    <AuthProvider>
      <ChatsProvider>
        <ThemeProvider theme={theme}>
          <SocketProvider>
            <Toaster />
            <App />
          </SocketProvider>
        </ThemeProvider>
      </ChatsProvider>
    </AuthProvider>
  </Router>
  // </React.StrictMode>
);
