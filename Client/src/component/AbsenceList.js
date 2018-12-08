import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Absence from "./Absence";
import { load_absence } from "../redux/actions/index";
import { fixed_idConsultan } from "../redux/actions/login";
import Axios from "axios";

class AbsenceList extends React.Component {
  componentDidMount() {
    Axios.get(`/consultant?ID=${this.props.idUser}`).then(res => {
      const idConsultant = res.data._id;
      this.props.fixed_idConsultan(idConsultant);
      Axios.get(`/absences?ID=${idConsultant}`).then(res => {
        console.log("les absences %%%%%%%%", res);
        const absence = res.data;
        console.log("voila mon da ta ", absence);

        this.props.load_absence(absence);
      });
    });
  }

  render() {
    const { absences } = this.props;
    return (
      <ul>
        <h3>Tableaux Des Absences Demandées</h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date de Début</th>
                <th scope="col">Date de Fin</th>
                <th scope="col">Type de congé</th>
                <th scope="col">Réponse</th>
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
            Ajouter une Demande
          </NavLink>
        </div>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  console.log("The State", JSON.stringify(state));
  return { absences: state.absences, idUser: state.login.idUser };
};

export default connect(
  mapStateToProps,
  { load_absence, fixed_idConsultan }
)(AbsenceList);
