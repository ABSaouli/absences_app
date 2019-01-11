import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import {
  fixRapportActiviteId,
  getActivite
} from "../redux/actions/rapportActivite";

class RapportActivite extends Component {
  render() {
    const { rapportActivite } = this.props;
    return (
      <ul>
        <ListGroup>
          {rapportActivite.map(rapActivite => (
            <ListGroupItem tag="a" action>
              <NavLink
                to={`/rapport-activite/${rapActivite._id}`}
                onClick={() => {
                  this.props.fixRapportActiviteId(rapActivite);
                  this.props.getActivite(rapActivite._id);
                }}
              >
                {moment(rapActivite.date)
                  .locale("fr")
                  .format("MMMM, YYYY")}
              </NavLink>
            </ListGroupItem>
          ))}
        </ListGroup>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    rapportActivite: state.rapportActivite.activateAll
  };
};

export default connect(
  mapStateToProps,
  { fixRapportActiviteId, getActivite }
)(RapportActivite);
