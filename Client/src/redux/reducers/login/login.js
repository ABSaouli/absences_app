const login = (
  state = { isLogin: false, idUser: "", idconsultant: "" },
  action
) => {
  switch (action.type) {
    case "LOGIN/SUCCESS":
      return { isLogin: true, idUser: action.user._id };
    case "LOGIN/FAILURE":
      return { isLogin: false, idUser: "" };
    case "FIXED/ID_CONSULTANT":
      return { ...state, idconsultant: action.id };
    default:
      return state;
  }
};

export default login;
