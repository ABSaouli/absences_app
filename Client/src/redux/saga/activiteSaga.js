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

export function* getActiviteRequest(action) {
  const res = yield call(axios.get, `/activite/${action.id}`);
  yield put(getActiviteIdSuccess(res.data));
}
