export const registerIdUser = user => {
  return {
    type: "REGISTER_ID_USER",
    user
  };
};

export const registerUser = user => {
  return {
    type: "REGISTER_USER",
    user
  };
};
