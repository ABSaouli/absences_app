import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginSuccess, registerUser, loginFailure } from "../actions/login";

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

export const EstimationAbsencesSuccess = data => {
  return {
    type: "ESTIMATION_ABSENCE_SUCCESS",
    data
  };
};

export function* authenticateRequest(action) {
  const res = yield call(axios, {
    url: "/login",
    method: "post",
    params: action.user
  });
  if (res.status === 200) {
    yield put(registerUser(res.data));
    yield put(loginSuccess(res.data));
  } else {
    yield put(loginFailure(res.data));
  }
}

export function* addAbsenceRequest(action) {
  yield call(axios.post, "/absence", action.data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
}

export function* EstimationAbsences(action) {
  const res = yield call(
    axios.get,
    `/estimations-conge?ID=${action.idConsultant}`
  );
  yield put(EstimationAbsencesSuccess(res.data));
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
  yield takeEvery("LOGIN_REQUEST", authenticateRequest);
  yield takeEvery("ADD_ABSENCE_REQUEST", addAbsenceRequest);
  yield takeEvery("ESTIMATIOS_CONGE", EstimationAbsences);
}
