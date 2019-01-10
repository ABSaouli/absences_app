import React, { Component, Fragment } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { getActivite } from "../redux/actions/rapportActivite";

class RapportActivite extends React.Component {
  render() {
    const { rapportActivite } = this.props;
    return (
      <ul>
        <ListGroup>
          {rapportActivite.map(rapActivite => (
            <ListGroupItem tag="a" action>
              <NavLink
                to={`/rapport-activite/${rapActivite._id}`}
                onClick={() => this.props.getActivite(rapActivite)}
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
  { getActivite }
)(RapportActivite);
