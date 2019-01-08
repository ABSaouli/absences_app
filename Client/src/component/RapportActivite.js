import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class RapportActivite extends React.Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem>Janvier, 2019</ListGroupItem>
        <ListGroupItem>Décember, 2018</ListGroupItem>
        <ListGroupItem>Nouvember, 2018</ListGroupItem>
        <ListGroupItem>October, 2018</ListGroupItem>
        <ListGroupItem>September, 2018</ListGroupItem>
        <ListGroupItem>Aout, 2018</ListGroupItem>
        <ListGroupItem>Juillet, 2018</ListGroupItem>
        <ListGroupItem>Juin, 2018</ListGroupItem>
      </ListGroup>
    );
  }
}

export default RapportActivite;
