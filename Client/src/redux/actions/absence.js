import axios from "axios";

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

// export const refusAbsence = id => {
//   return dispatch => {
//     return axios
//       .get(`/absences/refus?ID=${id}`)
//       .then(res => {
//         dispatch(refusAbsenceSuccess(res.data));
//       })
//       .catch(error => {
//         throw error;
//       });
//   };
// };

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
    return axios.get(`/consultant?ID=${id}`).then(res => {
      const idConsultant = res.data._id;
      dispatch(fixed_idConsultan(res.data));
      return axios.get(`/absences?ID=${idConsultant}`).then(res => {
        const absence = res.data;
        dispatch(load_absence(absence));
      });
    });
  };
};

export const getIdResponsable = id => {
  return dispatch => {
    return axios.get(`/responsable?ID=${id}`).then(res => {
      dispatch(fixed_idConsultan(res.data));
      return axios.get("/all-absences").then(res => {
        const absence = res.data;
        dispatch(load_absence(absence));
      });
    });
  };
};

export const addAbsence = data => {
  return dispatch => {
    return axios
      .post("/absence", data)
      .then(res => {
        dispatch(addAbsenceSuccess(res.data));
      })
      .catch(error => {
        console.log(error);
      });
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
