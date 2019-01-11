import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  getRapportActivitiesSuccess,
  getActiviteIdSuccess
} from "../actions/rapportActivite";

export function* getRapportActivitiesRequest(action) {
  const res = yield call(axios.get, "/rapport-activite");
  yield put(getRapportActivitiesSuccess(res.data));
}

export function* getActivitiesRequest(action) {
  const res = yield call(
    axios.get,
    `/activite?rapportActiviteId=${action.rapportActiviteId}`
  );
  yield put(getActiviteIdSuccess(res.data));
}

export function* enregisterRequest(action) {
  try {
    yield call(axios.post, "/activity", action.activities);
  } catch (err) {
    window.alert("kokoko");
  }
}
