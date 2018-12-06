import { NavLink, withRouter } from "react-router-dom";
import React, { Fragment } from "react";

const Navbar = props => {
  return (
    <Fragment>
      <div className="App">
        <div className="jumbotron text-center">
          <ul className="nav nav-pills mb-3" role="tablist">
            <li role="presentation">
              <NavLink to="/AddAbsence">AddAbsence</NavLink>
            </li>
            <li role="presentation">
              <NavLink to="/Consultant">Consultant</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Navbar);
