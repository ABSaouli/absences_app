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
      this.props.fixed_idConsultan(res.data);
      Axios.get(`/absences?ID=${idConsultant}`).then(res => {
        console.log("les absences %%%%%%%%", res);
        const absence = res.data;
        console.log("voila mon da ta ", absence);

        this.props.load_absence(absence);
      });
    });
  }

  render() {
    const { absences, user } = this.props;
    return (
      <ul>
        <h4>Consultant Profile : {user}</h4>
        <h3>Requested Absence Tables </h3>
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
        </div>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  console.log("The State", JSON.stringify(state));
  return {
    absences: state.absences,
    idUser: state.login.idUser,
    user: state.login.user
  };
};

export default connect(
  mapStateToProps,
  { load_absence, fixed_idConsultan }
)(AbsenceList);
