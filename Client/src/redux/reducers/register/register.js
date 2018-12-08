const register = (
  state = { isRegist: false, idUser: "", isRedirect: Boolean },
  action
) => {
  switch (action.type) {
    case "REGISTER_USER":
      if (action.user.typeUser === "Consultant") {
        return { isRegist: true, idUser: action.user._id, isRedirect: true };
      } else {
        return { isRegist: true, idUser: action.user._id, isRedirect: false };
      }
    default:
      return state;
  }
};

export default register;
