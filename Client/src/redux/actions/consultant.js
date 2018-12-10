import axios from "axios";

export const getConsultantSuccess = consultants => {
  return {
    type: "GET_CONSULTANTS",
    consultants
  };
};

export const getConsultants = id => {
  return dispatch => {
    return axios
      .get("/consultant/all")
      .then(res => {
        dispatch(getConsultantSuccess(res.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
