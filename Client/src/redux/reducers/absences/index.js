import { combineReducers } from "redux";
import absences from "./absences";
import visibilityAbsence from "./visibilityAbsence";

const todoApp = combineReducers({
  absences,
  visibilityAbsence
});

export default todoApp;
