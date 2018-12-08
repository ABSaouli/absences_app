import { combineReducers } from "redux";
import absences from "./absences/absences";
import login from "./login/login";
import register from "./register/register";
import visibilityAbsence from "./absences/visibilityAbsence";

const absenceReducer = combineReducers({
  register: register,
  login: login,
  absences: absences,
  visibilityAbsence: visibilityAbsence
});

export default absenceReducer;
