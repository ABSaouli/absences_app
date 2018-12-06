import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AbsenceList from "./component/AbsenceList";
import AddAbsence from "./component/AddAbsence";
import Navbar from "./component/Navbar";

export default function AbsenceApp() {
  return (
    <div className="absence-app">
      <Router>
        <Switch>
          <Route path="/absences" component={AbsenceList} />
          <Route path="/add-absence" component={AddAbsence} />
          <Redirect from="/" to="/absences" />
        </Switch>
      </Router>
    </div>
  );
}
