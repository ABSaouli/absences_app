import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  getRapportActiviteSuccess,
  getActiviteIdSuccess
} from "../actions/rapportActivite";

export function* getRapportActiviteRequest(action) {
  const res = yield call(axios.get, "/rapport-activite");
  yield put(getRapportActiviteSuccess(res.data));
}

export function* enregisterRequest(action) {
  try {
    yield call(axios.post, "/activite", action.activites);
  } catch (err) {
    window.alert("kokoko");
  }
}
