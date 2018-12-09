import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import ValidAbsence from "./ValidAbsence";
import { load_absence } from "../redux/actions/index";
import { fixed_idConsultan } from "../redux/actions/login";
import { registerIdUser } from "../redux/actions/register";
import Axios from "axios";

class ValidAbsenceList extends React.Component {
  componentDidMount() {
    Axios.get(`/responsable?ID=${this.props.idUser}`).then(res => {
      const idConsultant = res.data._id;
      this.props.fixed_idConsultan(idConsultant);
      //this.props.registerIdUser(res.data);
      Axios.get("/all-absences").then(res => {
        console.log("les absences %%%%%%%%", res);
        const absence = res.data;
        console.log("voila mon da ta ", absence);

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
    const { absences } = this.props;
    // const { user } = this.props;
    return (
      <ul>
        <h3>Demandes de congé a valider </h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date de Début</th>
                <th scope="col">Date de Fin</th>
                <th scope="col">Type de congé</th>
                <th scope="col">Validation </th>
                <th scope="col">Réponse</th>
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
          <NavLink className="float-right" to="/add-absence">
            Ajouter une Demande
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
    user: state.register.user
  };
};

export default connect(
  mapStateToProps,
  { load_absence, fixed_idConsultan, registerIdUser }
)(ValidAbsenceList);
