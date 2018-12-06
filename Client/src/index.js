import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import AbsenceApp from "./AbsenceApp";
import { Route, BrowserRouter } from "react-router-dom";

const store = configureStore();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={AbsenceApp} />
    </BrowserRouter>
  </Provider>,
  rootElement
);
