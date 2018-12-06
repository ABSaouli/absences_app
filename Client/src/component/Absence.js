import React from "react";

const Absence = ({ absence }) => (
  <tr>
    <td>{absence.name}</td>
    <td>{absence.username}</td>
    <td>{absence.TypeAbsence} </td>
    <td>{absence.reponse} </td>
  </tr>
);

export default Absence;
