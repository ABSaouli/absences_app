import React, { Component, Fragment } from "react";
import Axios from "axios";

class login extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: "",
      password: "",
      dispatch: true
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
    console.log("voila l'objer", this.state);
    if (this.state.email && this.state.password) {
      console.log("est voila la reponse : ");

      Axios.post(
        "/login",
        `email=${this.state.email}&password=${this.state.password}`
      )
        .then(response => {
          console.log("est voila la reponse : ", response);
        })
        .catch(error => {
          console.log(error);
        });
    }
    console.log("je susi en bas de lappelle de ajax ");

    this.setState(this.initialState);
  };

  submitNewUseForm = () => {
    console.log("voila l'objer", this.state);
    if (this.state.email && this.state.password) {
      Axios.post("http://localhost:3001/login", {
        body: {
          email: this.state.email,
          password: this.state.password
        }
      })
        .then(response => {
          console.log("est voila la reponse : ", response);
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState(this.initialState);
  };

  render() {
    const { email, password, dispatch } = this.state;
    return (
      <Fragment>
        {dispatch ? (
          <form>
            <ul>
              <div className="container-fluid">
                <div className="h3">Login</div>
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
                  <div>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={this.submitForm}
                    >
                      Login
                    </button>

                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => this.setState({ dispatch: !dispatch })}
                    >
                      New User
                    </button>
                  </div>
                </div>
              </div>
            </ul>
          </form>
        ) : (
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
                      onClick={this.submitNewUseForm}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </ul>
          </form>
        )}
      </Fragment>
    );
  }
}

export default login;
