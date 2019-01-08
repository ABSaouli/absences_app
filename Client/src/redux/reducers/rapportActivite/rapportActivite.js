const rapportActivite = (state = [], action) => {
  switch (action.type) {
    case "GET_RAPPORT_ACTIVITE_SUCCESS":
      return [...action.rapportActivite];
    default:
      return state;
  }
};

export default rapportActivite;
