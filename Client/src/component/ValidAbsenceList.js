import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ValidAbsence from "./ValidAbsence";
import { getIdResponsable } from "../redux/actions/absence";
import { getConsultants } from "../redux/actions/consultant";
import { getProject } from "../redux/actions/project";

class ValidAbsenceList extends React.Component {
  state = {
    isFlash: true
  };
  componentDidMount() {
    const idUser = this.props.idUser;
    this.props.getIdResponsable(idUser);
    setTimeout(() => {
      this.setState({ isFlash: false });
    }, 3000);
  }

  render() {
    const { absences, user } = this.props;
    // const { user } = this.props;
    return (
      <ul>
        {this.state.isFlash ? (
          <Fragment>
            <div class="alert alert-success" role="alert">
              Login success welcomme in count of Responsable: {user}!
            </div>
          </Fragment>
        ) : (
          <h4>
            <NavLink className="float-right" to="/edite-profil">
              Profile Of Responsable :{user}
            </NavLink>
          </h4>
        )}
        <Fragment>
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
            <br />
            <NavLink
              className="float-right"
              to="/add-project"
              onClick={this.props.getConsultants}
            >
              New-Project
            </NavLink>
            <br />
            <NavLink
              className="float-right"
              to="/all-project"
              onClick={this.props.getProject}
            >
              List_of_Project
            </NavLink>
          </div>
        </Fragment>
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
  { getIdResponsable, getConsultants, getProject }
)(ValidAbsenceList);
