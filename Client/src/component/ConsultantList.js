import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";

class AbsenceList extends React.Component {
  uploadeRib = id => {
    console.log("objet res of get rib ");
    Axios.get(`/consultant/rib/${id}`)
      .then(res => {
        console.log("objet res of get rib ", res);
      })
      .catch(err => {
        console.log("error of methode get bir ", err);
      });
  };
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
                    <td>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => this.uploadeRib(consultant._id)}
                      >
                        <span
                          class="glyphicon glyphicon-eye-open"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
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
