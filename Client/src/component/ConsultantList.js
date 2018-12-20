import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class AbsenceList extends React.Component {
  render() {
    const { consultants, user } = this.props;
    return (
      <ul>
        <h4>Consultant Profile {user}</h4>
        <h3>Consultants-List </h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname </th>
                <th scope="col">Mail</th>
                <th scope="col">age</th>
                <th scope="col">Debut contrat</th>
              </tr>
            </thead>
            <tbody>
              {consultants && consultants.length > 0 ? (
                consultants.map(consultant => (
                  <tr>
                    <td>{consultant.name}</td>
                    <td>{consultant.surname}</td>
                    <td>{consultant.mail} </td>
                    <td>{consultant.age}</td>
                    <td>{consultant.dateDebutContart}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No Consultants</td>
                </tr>
              )}
            </tbody>
          </table>
          <NavLink className="float-right" to="/valid-absences">
            Valid-absences
          </NavLink>
        </div>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    consultants: state.consultants,
    user: state.login.user
  };
};

export default connect(mapStateToProps)(AbsenceList);
