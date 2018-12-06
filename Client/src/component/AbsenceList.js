import React from "react";
import { NavLink } from "react-router-dom";
import Absence from "./Absence";

const Consultant = ({ absences }) => (
  <ul>
    <h3>Tableaux Des Absences Demandées</h3>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date de Début</th>
            <th scope="col">Date de Fin</th>
            <th scope="col">Type de congé</th>
            <th scope="col">Réponse</th>
          </tr>
        </thead>
        <tbody>
          {absences && absences.length > 0 ? (
            absences.map(absence => {
              return <Absence key={absence.id} absence={absence} />;
            })
          ) : (
            <tr>
              <td colSpan={4}>No users</td>
            </tr>
          )}
        </tbody>
      </table>
      <NavLink className="float-right" to="/addAbsence">
        Ajouter une Demande
      </NavLink>
    </div>
  </ul>
);

export default Consultant;
