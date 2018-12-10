import axios from "axios";

export const validAbsenceSuccess = id => {
  return {
    type: "VALID_ABSENCE",
    id
  };
};

export const validAbsence = id => {
  return dispatch => {
    return axios
      .get(`/absences/valid?ID=${id}`)
      .then(res => {
        dispatch(validAbsenceSuccess(res.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const refusAbsenceSuccess = id => {
  return {
    type: "REFUS_ABSENCE",
    id
  };
};

export const refusAbsence = id => {
  return dispatch => {
    return axios
      .get(`/absences/refus?ID=${id}`)
      .then(res => {
        dispatch(refusAbsenceSuccess(res.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const deleteAbsenceSuccess = id => {
  return {
    type: "DELETE_ABSENCE",
    id
  };
};

export const deleteAbsence = id => {
  return dispatch => {
    return axios
      .get(`/absences/delete?ID=${id}`)
      .then(res => {
        dispatch(deleteAbsenceSuccess(res.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

let nextAbsence = 0;
export const addAbsence = absence => {
  return {
    type: "ADD_ABSENCE",
    absence: { id: nextAbsence++, ...absence }
  };
};

export const load_absence = absence => {
  return {
    type: "LOAD_ABSENCES",
    absence
  };
};

export const addUser = (user, TypeUser) => {
  return {
    type: "ADD_USER",
    TypeUser,
    user
  };
};
