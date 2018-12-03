import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Component/Login";
import Navbar from "./Component/Navbar";
import Consultant from "./Component/Consultant";
import NewConsultant from "./Component/NewConsultant";
import AddAbsence from "./Component/AddAbsence";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Reducers/RootReducer";

const store = createStore(rootReducer);

let Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/app" component={App} />
          <Route path="/Login" component={Login} />
          <Route path="/Consultant" component={Consultant} />
          <Route path="/AddAbsence" component={AddAbsence} />
          <Route path="/newConsultant" component={NewConsultant} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Routes />, document.getElementById("root"));

serviceWorker.unregister();
