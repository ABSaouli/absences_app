import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/register";
import Axios from "axios";
class NewUser extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: "",
      password: "",
      confirmePassword: "",
      user: ""
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
    if (
      this.state.email &&
      this.state.password &&
      this.state.password === this.state.confirmePassword
    ) {
      Axios.post(
        "/register",
        `email=${this.state.email}&password=${this.state.password}`
      )
        .then(res => {
          // dispatch Register ID success action
          this.props.registerUser(res.data);
        })
        .catch(error => {
          // dispatch login failure action
          console.log(error);
        });
    }
    this.setState(this.initialState);
  };

  render() {
    const { email, password, confirmePassword } = this.state;
    const isRegist = this.props.isRegist;
    return isRegist ? (
      <Redirect to="/add-consultant" />
    ) : (
      <Fragment>
        <form>
          <ul>
            <div className="container-fluid">
              <div className="h3">New User</div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="email">email</label>
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
                <div className="form-group">
                  <label htmlFor="password">Confirme Password</label>
                  <input
                    type="password"
                    name="confirmePassword"
                    className="form-control"
                    value={confirmePassword}
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
                    Submit
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
  return { isRegist: state.register.isRegist };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(NewUser);
