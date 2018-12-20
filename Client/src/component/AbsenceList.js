import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Absence from "./Absence";
import { getIdConsultant, getEstimationConge } from "../redux/actions/absence";

class AbsenceList extends React.Component {
  state = {
    isFlash: true
  };
  componentDidMount() {
    const idUser = this.props.idUser;
    this.props.getIdConsultant(idUser);
    setTimeout(() => {
      this.setState({ isFlash: false });
    }, 3000);
  }

  render() {
    const { absences, user, idconsultant } = this.props;

    return (
      <ul>
        {this.state.isFlash ? (
          <Fragment>
            <div class="alert alert-success" role="alert">
              Login success welcomme in count of Consultant: {user}!
            </div>
          </Fragment>
        ) : (
          <h4>Consultant Profile : {user}</h4>
        )}
        <Fragment>
          <h3>Requested Absence Tables </h3>
          <h5>
            Absence Estimates :
            <NavLink
              className="float-right"
              to="/estimation-absence"
              onClick={() => this.props.getEstimationConge(idconsultant)}
            >
              Let's Go
            </NavLink>{" "}
          </h5>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Type of leave</th>
                  <th scope="col">Answer</th>
                  <th scope="col">Cancel</th>
                </tr>
              </thead>
              <tbody>
                {absences && absences.length > 0 ? (
                  absences.map(absence => {
                    return <Absence key={absence.id} absence={absence} />;
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>No users</td>
                  </tr>
                )}
              </tbody>
            </table>
            <NavLink className="float-right" to="/add-absence">
              Add a Request
            </NavLink>
            <br />
            <NavLink className="float-right" to="/list-project">
              View List of Project
            </NavLink>
          </div>
        </Fragment>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  console.log("The State", JSON.stringify(state));
  return {
    absences: state.absences,
    idUser: state.login.idUser,
    user: state.login.user,
    idconsultant: state.login.idconsultant
  };
};

export default connect(
  mapStateToProps,
  { getIdConsultant, getEstimationConge }
)(AbsenceList);
