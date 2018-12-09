import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/actions/login";
import { registerUser } from "../redux/actions/register";
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
      //authentication of user
      Axios.post(
        "/login",
        `email=${this.state.email}&password=${this.state.password}`
      )
        .then(response => {
          // dispatch login success action

          this.props.registerUser(response.data);
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
    //Redirect of login success and login failure
    const islogin = this.props.isLogin;
    //Redirect of user consultant and user responsable
    const isRedirect = this.props.isRedirect;
    return islogin ? (
      isRedirect ? (
        <Redirect to="/absences" />
      ) : (
        <Redirect to="/valid-absences" />
      )
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
  return {
    isLogin: state.login.isLogin,
    isRedirect: state.register.isRedirect
  };
};

export default connect(
  mapStateToProps,
  { loginSuccess, loginFailure, registerUser }
)(Login);
