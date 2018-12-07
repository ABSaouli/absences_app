export const performLogin = user => {
  return {
    type: "PERFORM_LOGIN",
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
