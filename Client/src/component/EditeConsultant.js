import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  getConsultantEdite,
  editeConsultant,
  getResponsableEdite,
  editeResponsable
} from "../redux/actions/consultant";

class EditeConsultant extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      surname: "",
      mail: "",
      age: ""
    };
    this.state = this.initialState;
  }

  componentDidMount = async () => {
    if (this.props.typeUser === "Consultant") {
      await this.props.getConsultantEdite(this.props.idconsultant);
      const consultant = this.props.consultants[0];
      this.setState({
        name: consultant.name,
        surname: consultant.surname,
        mail: consultant.mail,
        age: consultant.age
      });
    } else {
      await this.props.getResponsableEdite(this.props.idconsultant);
      const responsable = this.props.consultants[0];
      this.setState({
        name: responsable.name,
        surname: responsable.surname,
        mail: responsable.mail,
        age: responsable.age
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitForm = () => {
    if (
      this.state.name &&
      this.state.surname &&
      this.state.mail &&
      this.state.age
    ) {
      const consultant = {
        idconsultant: this.props.idconsultant,
        name: this.state.name,
        surname: this.state.surname,
        mail: this.state.mail,
        age: this.state.age
      };

      if (this.props.typeUser === "Consultant") {
        this.props.editeConsultant(consultant);
      } else {
        this.props.editeResponsable(consultant);
      }
    }
    this.setState(this.initialState);
  };

  render() {
    const { name, surname, mail, age } = this.state;
    return (
      <ul>
        <h3>Edite your Profil</h3>
        <Form>
          <div className="form-group">
            <label htmlFor="username">name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={this.handleChange}
              placeholder="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">surname</label>
            <input
              type="text"
              name="surname"
              className="form-control"
              value={surname}
              onChange={this.handleChange}
              placeholder="surname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">mail</label>
            <input
              type="text"
              name="mail"
              className="form-control"
              value={mail}
              onChange={this.handleChange}
              placeholder="mail"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">age</label>
            <input
              type="text"
              name="age"
              className="form-control"
              value={age}
              onChange={this.handleChange}
              placeholder="age"
            />
          </div>

          <FormGroup check>
            <Label check>
              <Input type="checkbox" /> Check me out
            </Label>
          </FormGroup>
          <button
            type="button"
            className="btn-primary"
            onClick={this.submitForm}
          >
            Submit
          </button>
        </Form>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    idconsultant: state.login.idconsultant,
    consultants: state.consultants,
    typeUser: state.register.user.typeUser
  };
};

export default connect(
  mapStateToProps,
  { getConsultantEdite, editeConsultant, getResponsableEdite, editeResponsable }
)(EditeConsultant);
