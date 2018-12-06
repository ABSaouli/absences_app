import React from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import Consultant from "./Consultant";
import NewConsultant from "./NewConsultant";
import AddAbsence from "./AddAbsence";
import { BrowserRouter, Switch, Route } from "react-router-dom";

let App = () => (
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
);

export default App;
