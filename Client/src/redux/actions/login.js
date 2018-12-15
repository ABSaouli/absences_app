import axios from "axios";

// export const authenticate = user => {
//   return dispatch => {
//     return axios
//       .post("/login", user)
//       .then(response => {
//         // dispatch login success action
//         dispatch(registerUser(response.data));
//         dispatch(loginSuccess(response.data));
//       })
//       .catch(error => {
//         // dispatch login failure action
//         dispatch(loginFailure(error));
//         console.log(error);
//       });
//   };
// };

export const authenticate = user => {
  return {
    type: "LOGIN_REQUEST",
    user: user
  };
};

export const registerUser = user => {
  return {
    type: "REGISTER_USER",
    user
  };
};

export const loginSuccess = user => {
  return {
    type: "LOGIN/SUCCESS",
    user
  };
};

export const loginFailure = error => {
  return {
    type: "LOGIN/FAILURE",
    error
  };
};

export const LogOut = () => {
  return {
    type: "LOG-OUT"
  };
};

export const addUserB = data => {
  return dispatch => {
    axios.post("/register", data).then(res => {
      dispatch(registerIdUser(res.data));
    });
  };
};

export const registerIdUser = user => {
  return {
    type: "REGISTER_ID_USER",
    user
  };
};
