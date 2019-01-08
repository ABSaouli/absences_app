import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import { getActiviteId } from "../redux/actions/rapportActivite";

class RapportActivite extends React.Component {
  render() {
    const { rapportActivite } = this.props;
    return (
      <ul>
        <ListGroup>
          {rapportActivite.map(rapActivite => (
            <ListGroupItem
              tag="button"
              action
              onClick={() => this.props.getActiviteId(rapActivite._id)}
            >
              {" "}
              {moment(rapActivite.date)
                .locale("fr")
                .format("MMMM, YYYY")}
            </ListGroupItem>
          ))}
        </ListGroup>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    rapportActivite: state.rapportActivite
  };
};

export default connect(
  mapStateToProps,
  { getActiviteId }
)(RapportActivite);
