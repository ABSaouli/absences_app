import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import login from "./component/login";
import Navbar from "./component/Navbar";
import consultant from "./component/consultant";
import newConsultant from "./component/newConsultant";
import Addabsance from "./component/Addabsance";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

let Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/app" component={App} />
          <Route path="/login" component={login} />
          <Route path="/consultant" component={consultant} />
          <Route path="/Addabsance" component={Addabsance} />
          <Route path="/newConsultant" component={newConsultant} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Routes />, document.getElementById("root"));

serviceWorker.unregister();
