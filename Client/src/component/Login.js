import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  performLogin,
  loginSuccess,
  loginFailure
} from "../redux/actions/login";
import Axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: "",
      password: ""
    };
    this.state = this.initialState;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitForm = () => {
    if (this.state.email && this.state.password) {
      Axios.post(
        "/login",
        `email=${this.state.email}&password=${this.state.password}`
      )
        .then(response => {
          // dispatch login success action
          this.props.loginSuccess(response.data);
        })
        .catch(error => {
          // dispatch login failure action
          this.props.loginFailure(error);
          console.log(error);
        });
    }
    this.setState(this.initialState);
  };

  render() {
    const { email, password } = this.state;
    const islogin = this.props.isLogin;
    return islogin ? (
      <Redirect to="/absences" />
    ) : (
      <Fragment>
        <form>
          <ul>
            <div className="container-fluid">
              <div className="h3">Login</div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={this.submitForm}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { isLogin: state.login.isLogin };
};

export default connect(
  mapStateToProps,
  { performLogin, loginSuccess, loginFailure }
)(Login);
