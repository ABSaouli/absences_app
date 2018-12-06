import React, { Component } from "react";
import Axios from "axios";

class Register extends Component {
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
      <form>
        <ul>
          <div className="container-fluid">
            <div className="h3">New User</div>
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
              <div className="form-group">
                <label htmlFor="password">Confirme Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Confirme Password"
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
    );
  }
}

export default Register;
