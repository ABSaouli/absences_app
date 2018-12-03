import { NavLink, withRouter } from "react-router-dom";
import React, { Fragment } from "react";

const Navbar = props => {
  return (
    <Fragment>
      <div className="App">
        <div className="jumbotron text-center">
          <ul className="nav nav-pills mb-3" role="tablist">
            <li role="presentation">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li role="presentation">
              <NavLink to="/">Home</NavLink>
            </li>
            <li role="presentation">
              <NavLink to="/App">App</NavLink>
            </li>
            <li role="presentation">
              <NavLink to="/consultant">Consultant</NavLink>
            </li>
            <li role="presentation">
              <NavLink to="/newConsultant">NewConsultant</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Navbar);
