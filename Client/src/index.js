import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import AbsenceApp from "./AbsenceApp";
import "./App.css";

const store = configureStore();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <AbsenceApp />
  </Provider>,
  rootElement
);
