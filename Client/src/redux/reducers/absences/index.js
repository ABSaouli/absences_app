import { combineReducers } from "redux";
import absences from "./absences";
import visibilityAbsence from "./visibilityAbsence";

const absenceReducer = combineReducers({
  absences: absences,
  visibilityAbsence: visibilityAbsence
});

export default absenceReducer;
