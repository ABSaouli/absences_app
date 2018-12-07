import React from "react";

const Absence = ({ absence }) => (
  <tr>
    <td>{absence.DateDebut}</td>
    <td>{absence.DateFin}</td>
    <td>{absence.TypeAbsence} </td>
    <td>{absence.reponse ? "👋" : "👌"} </td>
  </tr>
);

export default Absence;
