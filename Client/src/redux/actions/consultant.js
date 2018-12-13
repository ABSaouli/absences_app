import axios from "axios";
import { loginSuccess } from "./login";

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

export const addConsultant = consultant => {
  return dispatch =>
    axios
      .post("/consultant", consultant)
      .then(response => {
        dispatch(loginSuccess(response.data));
      })
      .catch(error => {
        console.log("error sur post/consultant ", error);
      });
};
