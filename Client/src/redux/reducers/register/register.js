const register = (state = { isRegist: false, idUser: "" }, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return { isRegist: true, idUser: action.id };
    default:
      return state;
  }
};

export default register;
