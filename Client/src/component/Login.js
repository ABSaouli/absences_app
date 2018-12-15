import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../redux/actions/login";
// import { registerUser } from "../redux/actions/register";
// import Axios from "axios";
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
      // const user = `email=${this.state.email}&password=${this.state.password}`;
      //authentication of user
      const user1 = { email: this.state.email, password: this.state.password };

      this.props.authenticate(user1);
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
        // redirect vers Consultant

        <Redirect to="/absences" />
      ) : (
        // redirect vers Responsable
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
                  <label htmlFor="email">mail</label>
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
  { authenticate }
)(Login);
