import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addUserB } from "../redux/actions/login";
class NewUser extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: "",
      password: "",
      confirmePassword: "",
      typeUser: ""
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
      this.state.typeUser &&
      this.state.email &&
      this.state.password &&
      this.state.password === this.state.confirmePassword
    ) {
      const user = `email=${this.state.email}&password=${
        this.state.password
      }&typeUser=${this.state.typeUser}`;
      this.props.addUserB(user);
    }
    this.setState(this.initialState);
  };

  render() {
    const { email, password, confirmePassword, typeUser } = this.state;
    const isRegist = this.props.isRegist;
    const isRedirect = this.props.isRedirect;

    return isRegist ? (
      isRedirect ? (
        <Redirect to="/add-consultant" />
      ) : (
        <Redirect to="/add-responsable" />
      )
    ) : (
      <Fragment>
        <form>
          <ul>
            <div className="container-fluid">
              <div className="h3">New User</div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="email">Responsable/Consultant</label>
                  <input
                    type="text"
                    name="typeUser"
                    className="form-control"
                    value={typeUser}
                    onChange={this.handleChange}
                    placeholder="select"
                  />
                </div>
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
                    Submit New User
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
    isRegist: state.register.isRegist,
    isRedirect: state.register.isRedirect
  };
};

export default connect(
  mapStateToProps,
  { addUserB }
)(NewUser);
