import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class ProjectList extends React.Component {
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
                project.map(projet => {
                  return (
                    <tr>
                      <td>{projet.title}</td>
                      <td>{projet.discriptif}</td>
                      <td>
                        <NavLink
                          className="float-right"
                          to={"/detail-project/" + projet._id}
                        >
                          <button className="btn btn-outline-success">
                            detail
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>No Projects</td>
                </tr>
              )}
            </tbody>
          </table>
          <NavLink className="float-right" to="/valid-absences">
            Valid-absences
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
    project: state.project.projects,
    user: state.login.user
  };
};

export default connect(mapStateToProps)(ProjectList);
