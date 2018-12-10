import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAbsence } from "../redux/actions/index";

class Absence extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.absence.dateDebut}</td>
        <td>{this.props.absence.dateFin}</td>
        <td>{this.props.absence.typeAbsence} </td>
        <td>
          {this.props.absence.reponse
            ? "👋"
            : this.props.absence.reponse === null
            ? "Refusé"
            : "👌"}{" "}
        </td>
        <td>
          <button
            onClick={() => this.props.deleteAbsence(this.props.absence._id)}
            className="btn btn-outline-success"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(
  null,
  { deleteAbsence }
)(Absence);
