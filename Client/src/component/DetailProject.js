import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getConsultantOfProject } from "../redux/actions/project";
class DetailProject extends Component {
  componentDidMount = () => {
    const listConsultant = this.props.project[0].consultant_list;
    listConsultant.forEach(idConsultant => {
      this.props.getConsultantOfProject(idConsultant);
    });
  };

  render() {
    const projet = this.props.project[0];
    const { title, discriptif } = projet
      ? projet
      : { title: "", descriptif: "" };
    const { consultantOfProject } = this.props
      ? this.props
      : { consultantOfProject: [] };
    return (
      <Fragment>
        <ul>
          <label htmlFor=""> Title of Project</label>
          <h5>{title}</h5>
          <br />
          <label htmlFor=""> Discriptif of Project</label>
          <h5>{discriptif}</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname </th>
                <th scope="col">Mail </th>
                <th scope="col">number of days working on the project</th>
              </tr>
            </thead>
            <tbody>
              {consultantOfProject && consultantOfProject.length > 0 ? (
                consultantOfProject.map(consultant => (
                  <tr>
                    <td>{consultant.name}</td>
                    <td>{consultant.surname}</td>
                    <td>{consultant.mail} </td>
                    <td>{consultant.nbJours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No Consultants</td>
                </tr>
              )}
            </tbody>
          </table>
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    project: state.project.projects.filter(projet => projet._id === id),
    consultantOfProject: state.project.consultantOfProject
  };
};

export default connect(
  mapStateToProps,
  { getConsultantOfProject }
)(DetailProject);
