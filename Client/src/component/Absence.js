import React from "react";

const Absence = ({ absence }) => (
  <tr>
    <td>{absence.dateDebut}</td>
    <td>{absence.dateFin}</td>
    <td>{absence.typeAbsence} </td>
    <td>{absence.reponse ? "👋" : "👌"} </td>
  </tr>
);

export default Absence;
