import axios from "axios";

export const getEstimationConge = idConsultant => {
  return {
    type: "ESTIMATIOS_CONGE",
    idConsultant
  };
};

export const validAbsenceRequest = id => {
  return {
    type: "VALID_ABSENCE_REQUEST",
    id
  };
};

export const refusAbsenceRequest = id => {
  return {
    type: "REFUS_ABSENCE_REQUEST",
    id
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

export const getIdConsultant = id => {
  return dispatch => {
    return axios.get(`/consultant?id_user=${id}`).then(res => {
      const idConsultant = res.data[0]._id;
      const user = res.data[0];
      dispatch(fixed_idConsultan(user));
      axios.get(`/absences?id_consultant=${idConsultant}`).then(res => {
        const absence = res.data;
        dispatch(load_absence(absence));
      });
    });
  };
};

export const getIdResponsable = id => {
  return dispatch => {
    axios.get(`/responsable?id_user=${id}`).then(res => {
      dispatch(fixed_idConsultan(res.data));
      axios.get("/all-absences").then(res => {
        const absence = res.data;
        dispatch(load_absence(absence));
      });
    });
  };
};

export const addAbsence = data => {
  return {
    type: "ADD_ABSENCE_REQUEST",
    data
  };
};

let nextAbsence = 0;
export const addAbsenceSuccess = absence => {
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

export const fixed_idConsultan = user => {
  return {
    type: "FIXED/ID_CONSULTANT",
    user
  };
};
