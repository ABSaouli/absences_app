import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class consultant extends Component {
  state = {
    Data: [
      {
        id: 1,
        name: "10/12/2018",
        username: "10/12/2018",
        type: "congé maladie",
        reponse: "En attent"
      },
      {
        id: 2,
        name: "10/12/2018",
        username: "10/12/2018",
        type: "congé maladie",
        reponse: "En attent"
      },
      {
        id: 3,
        name: "10/12/2018",
        username: "10/12/2018",
        type: "congé maladie",
        reponse: "En attent"
      },
      {
        id: 4,
        name: "10/12/2018",
        username: "10/12/2018",
        type: "congé maladie",
        reponse: "En attent"
      }
    ]
  };

  render() {
    const Data = this.state.Data;
    return (
      <ul>
        <h3>Tableaux Des Absances Demander</h3>
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
              {Data.length > 0 ? (
                Data.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.type} </td>
                    <td>{user.reponse} </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No users</td>
                </tr>
              )}

              <tr>
                <td />
                <td />
                <td />
                <td>
                  <li role="presentation">
                    <NavLink to="/Addabsance">Ajouter une Demande</NavLink>
                  </li>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ul>
    );
  }
}

export default consultant;
