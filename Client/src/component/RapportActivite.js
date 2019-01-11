import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import {
  fixedRapportActivities,
  getActivities
} from "../redux/actions/rapportActivite";

class RapportActivite extends Component {
  render() {
    const { rapportActivities } = this.props;
    return (
      <ul>
        <ListGroup>
          {rapportActivities.map(rapActivite => (
            <ListGroupItem tag="a" action>
              <NavLink
                to={`/rapport-activite/${rapActivite._id}`}
                onClick={() => {
                  this.props.fixedRapportActivities(rapActivite);
                  this.props.getActivities(rapActivite._id);
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
    rapportActivities:
      state.rapportActivitiesReducer.rapportActivitie.rapportActivities
  };
};

export default connect(
  mapStateToProps,
  { fixedRapportActivities, getActivities }
)(RapportActivite);
