import React from "react";
import AbsenceList from "./component/AbsenceList";
import Navbar from "./component/Navbar";

export default function AbsenceApp() {
  return (
    <div className="todo-app">
      <Navbar />
      <AbsenceList />
    </div>
  );
}
