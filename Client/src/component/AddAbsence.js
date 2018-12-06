import React, { Component } from "react";
import { connect } from "react-redux";
import { addAbsence } from "../redux/actions/index";

class AddAbsence extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      DateDebut: "",
      DateFin: "",
      TypeAbsence: "",
      reponse: ""
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
    if (this.state.DateDebut && this.state.DateFin && this.state.TypeAbsence) {
      const absence = {
        DateDebut: this.state.DateDebut,
        DateFin: this.state.DateFin,
        type: this.state.TypeAbsence,
        reponse: false
      };
      this.props.addAbsence(absence);
    }
    this.setState(this.initialState);
  };

  render() {
    const { DateDebut, DateFin, TypeAbsence } = this.state;

    return (
      <form>
        <ul>
          <div className="form-group">
            <label>Date Début</label>
            <input
              type="text"
              className="form-control"
              name="DateDebut"
              value={DateDebut}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date de Fin</label>
            <input
              type="text"
              className="form-control"
              name="DateFin"
              value={DateFin}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Type de congé</label>
            <input
              type="text"
              className="form-control"
              name="TypeAbsence"
              value={TypeAbsence}
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

export default connect(
  null,
  { addAbsence }
)(AddAbsence);
