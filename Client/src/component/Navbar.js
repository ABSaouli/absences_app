import { NavLink } from "react-router-dom";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { LogOut } from "../redux/actions/login";

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          <div className="jumbotron text-center">
            <ul className="nav nav-pills mb-3" role="tablist">
              <li className="float-left" role="presentation">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="float-right" role="presentation">
                <NavLink to="/new-user">New User</NavLink>
              </li>
              <li className="float-left" role="presentation">
                <NavLink to="/" onClick={this.props.LogOut}>
                  LogOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { LogOut }
)(Navbar);
