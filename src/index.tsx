import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";

import "./index.css";
import App from "./App";
import theme from "./assets/theme";
import store from "./store";
import "assets/styles/common.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// Removed reportWebVitals to avoid build issues with web-vitals v4
// reportWebVitals();
