const register = (
  state = { isRegist: false, idUser: "", user: "", isRedirect: Boolean },
  action
) => {
  switch (action.type) {
    case "REGISTER_USER":
      if (action.user.typeUser === "Consultant") {
        return {
          isRegist: true,
          idUser: action.user._id,
          user: "",
          isRedirect: true
        };
      } else {
        return {
          isRegist: true,
          idUser: action.id,
          user: action.user,
          isRedirect: false
        };
      }
    case "REGISTER_ID_USER":
      if (action.user.typeUser === "Consultant") {
        return {
          isRegist: true,
          idUser: action.user._id,
          user: action.user.name,
          isRedirect: true
        };
      } else {
        return {
          isRegist: true,
          idUser: action.user._id,
          user: action.user.name,
          isRedirect: false
        };
      }
    default:
      return state;
  }
};

export default register;
