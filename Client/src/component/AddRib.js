import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Axios from "axios";

class AddRib extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      selectedRib: null
    };
    this.state = this.initialState;
  }

  handleselectedFile = event => {
    console.log("batatattat", event.target);
    this.setState({
      selectedRib: event.target.files[0]
    });
  };

  submitForm = () => {
    let formData = new FormData();
    const selectedRib = this.state.selectedRib;
    formData.append("Rib", selectedRib);

    Axios.post(`/consultant/rib/${this.props.idconsultant}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(function() {
        console.log("SUCCESS!!");
      })
      .catch(function() {
        console.log("FAILURE!!");
      });

    this.setState(this.initialState);
  };

  uploadeRib = () => {
    Axios.get(`/consultant/rib/${this.props.idconsultant}`)
      .then(res => {
        console.log("objet res of get rib ", res);
      })
      .catch(err => {
        console.log("error of methode get bir ", err);
      });
  };

  render() {
    return (
      <ul>
        <h3>Edite your RIB</h3>
        <button type="button" className="btn-primary" onClick={this.uploadeRib}>
          <span class="glyphicon glyphicon-eye-open" aria-hidden="true" />
        </button>

        <Form>
          <FormGroup>
            <Label for="exampleFile">Add or update your RIB</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={this.handleselectedFile}
            />
            <FormText color="muted">load your RIB here</FormText>
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
    consultants: state.consultants
  };
};

export default connect(mapStateToProps)(AddRib);
