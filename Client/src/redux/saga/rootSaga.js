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

export const getProjectSuccess = data => {
  return {
    type: "GET_PROJECT_SUCCESS",
    data
  };
};

export const getConsultantOfProjectSuccess = data => {
  return {
    type: "GET_CONSULTANT_OF_PROJECT_SUCCESS",
    data
  };
};

export function* authenticateRequest(action) {
  try {
    const res = yield call(axios, {
      url: "/login",
      method: "post",
      params: action.user
    });
    yield put(registerUser(res.data));
    yield put(loginSuccess(res.data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* addAbsenceRequest(action) {
  yield call(axios.post, "/absence", action.data);
}

export function* addProjectRequest(action) {
  yield call(axios.post, "/project", action.project);
}

export function* getProjectRequest() {
  const res = yield call(axios.get, "/project");
  yield put(getProjectSuccess(res.data));
}

export function* EstimationAbsences(action) {
  const res = yield call(
    axios.get,
    `/estimations-conge?ID=${action.idConsultant}`
  );
  yield put(EstimationAbsencesSuccess(res.data));
}

export function* validOneAbsence(action) {
  const id = yield call(axios.get, `/absences/valid?_id=${action.id}`);
  yield put(validAbsenceSuccess(id.data));
}
export function* refusOneAbsence(action) {
  const id = yield call(axios.get, `/absences/refus?_id=${action.id}`);
  yield put(refusAbsenceSuccess(id.data));
}

export function* getConsultantOfProjectRequest(action) {
  const res = yield call(axios.get, `/consultant/${action.id}`);
  yield put(getConsultantOfProjectSuccess(res.data));
}

export default function* rootSaga() {
  yield takeEvery("VALID_ABSENCE_REQUEST", validOneAbsence);
  yield takeLatest("REFUS_ABSENCE_REQUEST", refusOneAbsence);
  yield takeEvery("LOGIN_REQUEST", authenticateRequest);
  yield takeEvery("ADD_ABSENCE_REQUEST", addAbsenceRequest);
  yield takeEvery("ESTIMATIOS_CONGE", EstimationAbsences);
  yield takeEvery("ADD_PROJECT_REQUEST", addProjectRequest);
  yield takeEvery("GET_PROJECT_REQUEST", getProjectRequest);
  yield takeEvery("GET_CONSULTANT_OF_PROJECT", getConsultantOfProjectRequest);
}
