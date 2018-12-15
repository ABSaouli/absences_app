import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AbsenceList from "./component/AbsenceList";
import AddAbsence from "./component/AddAbsence";
import AddConsultant from "./component/AddConsultant";
import NewUser from "./component/NewUser";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import AddResponsable from "./component/AddResponsable";
import ValidAbsences from "./component/ValidAbsenceList";
import ConsultantList from "./component/ConsultantList";
import EstimationAbsence from "./component/EstimationAbsence";

export default function AbsenceApp() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="container-fluid" />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/new-user" component={NewUser} />
          <Route exact path="/add-consultant" component={AddConsultant} />
          <Route exact path="/add-responsable" component={AddResponsable} />
          <Route exact path="/absences" component={AbsenceList} />
          <Route exact path="/valid-absences" component={ValidAbsences} />
          <Route exact path="/consultant-list" component={ConsultantList} />
          <Route
            exact
            path="/estimation-absence"
            component={EstimationAbsence}
          />
          <Route exact path="/add-absence" component={AddAbsence} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
