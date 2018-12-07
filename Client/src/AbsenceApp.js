import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AbsenceList from "./component/AbsenceList";
import AddAbsence from "./component/AddAbsence";
import Navbar from "./component/Navbar";
import Login from "./component/Login";

export default function AbsenceApp() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/absences" component={AbsenceList} />
          <Route path="/add-absence" component={AddAbsence} />
          <Redirect from="/" to="/absences" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
