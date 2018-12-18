import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class AbsenceList extends React.Component {
  render() {
    const { estimation, user } = this.props;
    return (
      <ul>
        <h4>Consultant Profile {user}</h4>
        <h3>Estimation of Leave Entitlement </h3>
        {estimation.total < -10 ? (
          <Fragment>
            <div class="alert alert-warning" role="alert">
              Warning alert - Total absences lower than -10 !
            </div>
          </Fragment>
        ) : (
          ""
        )}
        <Fragment>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Days validate</th>
                  <th scope="col">Waiting days </th>
                  <th scope="col">Days Refused</th>
                  <th scope="col">Days from the beginning of the contract</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {estimation ? (
                  <tr>
                    <td>{estimation.absenceValid}</td>
                    <td>{estimation.absenceEnAttent} </td>
                    <td>{estimation.absenceRefus}</td>
                    <td>{estimation.joursDroit}</td>
                    <td>{estimation.total}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4}>No users</td>
                  </tr>
                )}
              </tbody>
            </table>
            <NavLink className="float-right" to="/absences">
              Routurne
            </NavLink>
          </div>
        </Fragment>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    estimation: state.estimation,
    user: state.login.user
  };
};

export default connect(mapStateToProps)(AbsenceList);
