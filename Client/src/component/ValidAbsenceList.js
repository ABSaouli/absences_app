import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ValidAbsence from "./ValidAbsence";
import { load_absence } from "../redux/actions/index";
import { getConsultants } from "../redux/actions/consultant";
import { fixed_idConsultan } from "../redux/actions/login";
import { registerIdUser } from "../redux/actions/register";
import Axios from "axios";

class ValidAbsenceList extends React.Component {
  componentDidMount() {
    Axios.get(`/responsable?ID=${this.props.idUser}`).then(res => {
      this.props.fixed_idConsultan(res.data);
      //this.props.registerIdUser(res.data);
      Axios.get("/all-absences").then(res => {
        const absence = res.data;
        this.props.load_absence(absence);
      });
    });
  }

  componentDidUpdate() {
    this.handleValidSubmit = id => {
      console.log("%%%% id %%%", id);
    };
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
  { load_absence, fixed_idConsultan, registerIdUser, getConsultants }
)(ValidAbsenceList);
