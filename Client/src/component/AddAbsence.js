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
      dateDebut: "",
      dateFin: "",
      typeAbsence: "",
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
    if (this.state.dateDebut && this.state.dateFin && this.state.typeAbsence) {
      const absence = {
        dateDebut: this.state.dateDebut,
        dateFin: this.state.dateFin,
        typeAbsence: this.state.typeAbsence
      };
      this.props.addAbsence(absence);
      Axios.post(
        "/absence",
        `dateDebut=${this.state.dateDebut}&dateFin=${
          this.state.dateFin
        }&typeAbsence=${this.state.typeAbsence}&idconsultant=${
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
    const { dateDebut, dateFin, typeAbsence, addDone } = this.state;

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
                name="dateDebut"
                value={dateDebut}
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
                name="dateFin"
                value={dateFin}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Type de congé</label>
              <input
                type="text"
                className="form-control"
                name="typeAbsence"
                value={typeAbsence}
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
