import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addAbsence } from "../redux/actions/index";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class AddAbsence extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      DateDebut: "",
      DateFin: "",
      TypeAbsence: "",
      reponse: "",
      addDone: false
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
        TypeAbsence: this.state.TypeAbsence
      };
      console.log(absence);
      this.props.addAbsence(absence);
      Axios.post(
        "/absence",
        `dateDebut=${this.state.DateDebut}&dateFin=${
          this.state.DateFin
        }&typeAbsence=${this.state.TypeAbsence}&idconsultant=${
          this.props.idconsultant
        }`
      )
        .then(response => {
          console.log("est voila la reponse : ", response);
        })
        .catch(error => {
          console.log(error);
        });
      this.setState({ addDone: true });
    }
  };

  render() {
    const { DateDebut, DateFin, TypeAbsence, addDone } = this.state;

    return addDone ? (
      <Redirect to="/absences" />
    ) : (
      <Fragment>
        <form>
          <ul>
            <div className="form-group">
              <label>Date Début</label>
              <input
                type="date"
                id="start"
                min="2018-01-01"
                max="2018-12-31"
                className="form-control"
                name="DateDebut"
                value={DateDebut}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date de Fin</label>
              <input
                type="date"
                id="start"
                min="2018-01-01"
                max="2018-12-31"
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
        <NavLink className="float-right" to="/absences">
          Absences List
        </NavLink>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { idconsultant: state.login.idconsultant };
};

export default connect(
  mapStateToProps,
  { addAbsence }
)(AddAbsence);
