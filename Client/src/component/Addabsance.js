import React, { Component } from "react";
import Axios from "axios";

class Addabsance extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      surname: "",
      type: ""
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
    console.log(this.state);
    if (this.state.name && this.state.surname) {
      Axios("/newConsultant", {
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
    const { name, surname, type } = this.state;

    return (
      <form>
        <ul>
          <div className="form-group">
            <label>Date Début</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date de Fin</label>
            <input
              type="text"
              className="form-control"
              name="surname"
              value={surname}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Type de congé</label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={type}
              onChange={this.handleChange}
            />
          </div>
          <input
            type="button"
            className="btn btn-primary"
            value="Submit"
            onClick={this.submitForm}
          />
        </ul>
      </form>
    );
  }
}

export default Addabsance;
