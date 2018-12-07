import { combineReducers } from "redux";
import absences from "./absences/absences";
import login from "./login/login";
import visibilityAbsence from "./absences/visibilityAbsence";

const absenceReducer = combineReducers({
  login: login,
  absences: absences,
  visibilityAbsence: visibilityAbsence
});

export default absenceReducer;
