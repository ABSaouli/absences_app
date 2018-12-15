const Estimation = (state = {}, action) => {
  switch (action.type) {
    case "ESTIMATION_ABSENCE_SUCCESS":
      return { ...action.data };
    default:
      return state;
  }
};

export default Estimation;
