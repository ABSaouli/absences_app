import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addProject } from "../redux/actions/project";
class NewUser extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      discriptif: "",
      titre: "",
      listConsultant: [],
      checked: false
    };
    this.state = this.initialState;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handelClick = consultant => {
    this.setState({
      listConsultant: [...this.state.listConsultant, consultant._id]
    });
  };

  submitForm = () => {
    if (this.state.titre && this.state.discriptif) {
      console.log("voila le state  %%%%%%%", this.state);

      const projet = {
        titre: this.state.titre,
        discriptif: this.state.discriptif,
        listConsultant: this.state.listConsultant
      };
      this.props.addProject(projet);
    }
    this.setState(this.initialState);
  };

  render() {
    const { discriptif, titre, checked } = this.state;
    const { consultants } = this.props;
    return (
      <Fragment>
        <form>
          <ul>
            <div className="container-fluid">
              <div className="h3">New Project</div>
              <NavLink className="float-right" to="/valid-absences">
                Valid-absences
              </NavLink>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="email">Title</label>
                  <input
                    type="text"
                    name="titre"
                    className="form-control"
                    value={titre}
                    onChange={this.handleChange}
                    placeholder="Title of project"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Discriptif of Project
                  </label>
                  <textarea
                    type="text"
                    name="discriptif"
                    className="form-control"
                    placeholder="descriptif of project"
                    value={discriptif}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Surname </th>
                        <th scope="col">select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultants && consultants.length > 0 ? (
                        consultants.map(consultant => {
                          return (
                            <tr>
                              <td>{consultant.name}</td>
                              <td>{consultant.surname}</td>
                              <td>
                                {" "}
                                <input
                                  type="checkbox"
                                  className="btn-primary"
                                  onChange={this.handleChange}
                                  onClick={() => {
                                    this.handelClick(consultant);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4}>No Consultants</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={this.submitForm}
                  >
                    Submit New Project
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    consultants: state.consultants
  };
};

export default connect(
  mapStateToProps,
  { addProject }
)(NewUser);
