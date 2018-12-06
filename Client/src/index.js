import React from "react";
import ReactDOM from "react-dom";
import App from "./Component/App";
// import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducerAbsence from "./redux/reducers/absences";

const store = createStore(reducerAbsence);

let Routes = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Routes />, document.getElementById("root"));
