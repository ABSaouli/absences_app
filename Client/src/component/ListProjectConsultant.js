import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getProjectOfConsultant } from "../redux/actions/project";

class ListProjectConsultant extends React.Component {
  componentDidMount = () => {
    this.props.getProjectOfConsultant(this.props.idconsultant);
  };

  render() {
    const { project, user } = this.props;
    const isLoading = project ? true : false;
    return isLoading ? (
      <ul>
        <h4>Consultant Profile {user}</h4>
        <h3>List of Projects </h3>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Discriptif of project</th>
                <th scope="col">detail of project</th>
              </tr>
            </thead>
            <tbody>
              {project && project.length > 0 ? (
                project.map(projet => (
                  <tr>
                    <td>{projet.title}</td>
                    <td>{projet.discriptif}</td>
                    <td>
                      <button className="btn btn-outline-success">
                        detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No Projects</td>
                </tr>
              )}
            </tbody>
          </table>
          <NavLink className="float-right" to="/absences">
            List-absences
          </NavLink>
        </div>
      </ul>
    ) : (
      <dir>
        <p>...Loading</p>
      </dir>
    );
  }
}
const mapStateToProps = state => {
  return {
    project: state.project.ProjectOfConsultant,
    user: state.login.user,
    idconsultant: state.login.idconsultant
  };
};

export default connect(
  mapStateToProps,
  { getProjectOfConsultant }
)(ListProjectConsultant);
