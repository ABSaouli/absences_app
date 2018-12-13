import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginSuccess, registerUser } from "../actions/login";

export const validAbsenceSuccess = id => {
  return {
    type: "VALID_ABSENCE",
    id
  };
};

export const refusAbsenceSuccess = id => {
  return {
    type: "REFUS_ABSENCE",
    id
  };
};

export function* authenticateRequest(action) {
  const res = yield call(axios, {
    url: "/login",
    method: "post",
    params: action.user
  });
  yield put(registerUser(res.data));
  yield put(loginSuccess(res.data));
}

export function* validOneAbsence(action) {
  const id = yield call(axios.get, `/absences/valid?ID=${action.id}`);
  yield put(validAbsenceSuccess(id.data));
}
export function* refusOneAbsence(action) {
  const id = yield call(axios.get, `/absences/refus?ID=${action.id}`);
  yield put(refusAbsenceSuccess(id.data));
}

export default function* rootSaga() {
  yield takeEvery("VALID_ABSENCE_REQUEST", validOneAbsence);
  yield takeLatest("REFUS_ABSENCE_REQUEST", refusOneAbsence);
  yield takeLatest("LOGIN_REQUEST", authenticateRequest);
}
