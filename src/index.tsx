import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import theme from "./assets/theme";
import "assets/styles/common.css";
import store from "./store";

ReactDOM.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById("root")
);
