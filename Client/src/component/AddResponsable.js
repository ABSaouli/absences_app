import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/actions/login";

class AddResponsable extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      surname: "",
      mail: "",
      age: ""
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
      this.state.name &&
      this.state.surname &&
      this.state.mail &&
      this.state.age
    ) {
      Axios.post(
        "/responsable",
        `name=${this.state.name}&surname=${this.state.surname}&mail=${
          this.state.mail
        }&age=${this.state.age}&idUser=${this.props.idUser}`
      )
        .then(response => {
          this.props.loginSuccess(response.data);
        })
        .catch(error => {
          console.log("error sur post/consultant ", error);
        });
    }
    this.setState(this.initialState);
  };

  render() {
    const { name, surname, mail, age } = this.state;
    const isLogin = this.props.isLogin;
    return isLogin ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <form>
          <ul>
            <div className="container-fluid">
              <div className="h3">Add Responsable</div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="username">name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={this.handleChange}
                    placeholder="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">surname</label>
                  <input
                    type="text"
                    name="surname"
                    className="form-control"
                    value={surname}
                    onChange={this.handleChange}
                    placeholder="surname"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">mail</label>
                  <input
                    type="text"
                    name="mail"
                    className="form-control"
                    value={mail}
                    onChange={this.handleChange}
                    placeholder="mail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">age</label>
                  <input
                    type="text"
                    name="age"
                    className="form-control"
                    value={age}
                    onChange={this.handleChange}
                    placeholder="age"
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
  return { idUser: state.register.idUser, isLogin: state.login.isLogin };
};

export default connect(
  mapStateToProps,
  { loginSuccess, loginFailure }
)(AddResponsable);
