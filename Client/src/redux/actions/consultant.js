import axios from "axios";
import { loginSuccess } from "./login";

export const getConsultantSuccess = consultants => {
  return {
    type: "GET_CONSULTANTS",
    consultants
  };
};

export const editeConsultant = consultant => {
  return {
    type: "EDITE_CONSULTANT_REQUEST",
    consultant
  };
};

export const editeResponsable = responsable => {
  return {
    type: "EDITE_RESPONSABLE_REQUEST",
    responsable
  };
};

export const getConsultantEditeSuccess = consultant => {
  return {
    type: "GET_CONSULTANT_EDITE",
    consultant
  };
};

export const getResponsableEditeSuccess = responsable => {
  return {
    type: "GET_RESPONSABLE_EDITE",
    responsable
  };
};

export const getConsultants = id => {
  return dispatch => {
    return axios
      .get("/consultant")
      .then(res => {
        dispatch(getConsultantSuccess(res.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const getConsultantEdite = id => {
  return dispatch => {
    return axios
      .get(`/consultant/${id}`)
      .then(res => {
        dispatch(getConsultantEditeSuccess(res.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const getResponsableEdite = id => {
  return dispatch => {
    return axios
      .get(`/responsable/${id}`)
      .then(res => {
        dispatch(getResponsableEditeSuccess(res.data));
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
