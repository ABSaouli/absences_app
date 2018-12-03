import React, { Component } from "react";
import Axios from "axios";

class NewConsultant extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      surname: "",
      mail: "",
      age: "",
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
    if (
      this.state.name &&
      this.state.surname &&
      this.state.mail &&
      this.state.age &&
      this.state.password
    ) {
      console.log(this.state);
      Axios("http://localhost:3000/consultant", {
        method: "POST",
        body: this.state
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState(this.initialState);
  };

  render() {
    const { name, surname, mail, age, password } = this.state;
    return (
      <form>
        <ul>
          <div className="container-fluid">
            <div className="h3">Add Consultant</div>
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
              <div className="form-group">
                <label htmlFor="password">password</label>
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

export default NewConsultant;
