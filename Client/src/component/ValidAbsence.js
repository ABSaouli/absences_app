import React, { Component } from "react";
import { connect } from "react-redux";
import { refusAbsence, validAbsence } from "../redux/actions/index";

class ValidAbsence extends Component {
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
            onClick={() => this.props.validAbsence(this.props.absence._id)}
            className="btn btn-outline-success"
          >
            Accept
          </button>
          <button
            onClick={() => this.props.refusAbsence(this.props.absence._id)}
            className="btn btn-outline-danger"
          >
            Refused
          </button>
        </td>
      </tr>
    );
  }
}

// const mapStateToProps = state => {
//   return { absence: state.absence };
// };

export default connect(
  null,
  { validAbsence, refusAbsence }
)(ValidAbsence);
