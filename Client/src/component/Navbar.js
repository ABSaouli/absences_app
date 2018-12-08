import { NavLink } from "react-router-dom";
import React from "react";

const Navbar = props => {
  return (
    <div className="App">
      <div className="jumbotron text-center">
        <ul className="nav nav-pills mb-3" role="tablist">
          <li role="presentation">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li role="presentation">
            <NavLink to="/add-consultant">New Consultant</NavLink>
          </li>
          <li role="presentation">
            <NavLink to="/new-user">New User</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
