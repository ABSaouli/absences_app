import { call } from "redux-saga/effects";
import axios from "axios";

export function* editeResponsableRequest(action) {
  yield call(
    axios.put,
    `/responsable/${action.responsable.idconsultant}`,
    action.responsable
  );
}
