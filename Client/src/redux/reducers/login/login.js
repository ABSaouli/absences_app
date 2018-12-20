const login = (
  state = { isLogin: false, idUser: "", idconsultant: "", user: "" },
  action
) => {
  switch (action.type) {
    case "LOGIN/SUCCESS":
      return {
        isLogin: true,
        idUser: action.user._id,
        idconsultant: "",
        user: ""
      };
    case "LOGIN/FAILURE":
      return { isLogin: false, idUser: "", idconsultant: "", user: "" };
    case "LOG-OUT":
      return { isLogin: false, idUser: "", idconsultant: "", user: "" };
    case "FIXED/ID_CONSULTANT":
      return {
        ...state,
        idconsultant: action.user._id,
        user: action.user.name
      };
    default:
      return state;
  }
};

export default login;
