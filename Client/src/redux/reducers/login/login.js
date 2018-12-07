const login = (state = { isLogin: false, idUser: "" }, action) => {
  switch (action.type) {
    case "LOGIN/SUCCESS":
      return { isLogin: true, idUser: action.user._id };
    case "LOGIN/FAILURE":
      return { isLogin: false, idUser: "" };
    default:
      return state;
  }
};

export default login;
