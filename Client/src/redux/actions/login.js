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

export const fixed_idConsultan = id => {
  return {
    type: "FIXED/ID_CONSULTANT",
    id
  };
};
