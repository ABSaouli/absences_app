import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ValidAbsence from "./ValidAbsence";
import { getIdResponsable } from "../redux/actions/absence";
import { getConsultants } from "../redux/actions/consultant";

class ValidAbsenceList extends React.Component {
  componentDidMount() {
    const idUser = this.props.idUser;
    this.props.getIdResponsable(idUser);
  }

  render() {
    const { absences, user } = this.props;
    // const { user } = this.props;
    return (
      <ul>
        <h4>Profil de Responsable : {user}</h4>
        <h3>Demandes de congé a valider </h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Type of leave</th>
                <th scope="col">Validation </th>
                <th scope="col">Answer</th>
              </tr>
            </thead>
            <tbody>
              {absences && absences.length > 0 ? (
                absences.map(absence => {
                  return <ValidAbsence key={absence._id} absence={absence} />;
                })
              ) : (
                <tr>
                  <td colSpan={5}>No users</td>
                </tr>
              )}
            </tbody>
          </table>
          <NavLink
            className="float-right"
            to="/consultant-list"
            onClick={this.props.getConsultants}
          >
            Consultant-List
          </NavLink>
        </div>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    absences: state.absences,
    idUser: state.login.idUser,
    user: state.login.user
  };
};

export default connect(
  mapStateToProps,
  { getIdResponsable, getConsultants }
)(ValidAbsenceList);
