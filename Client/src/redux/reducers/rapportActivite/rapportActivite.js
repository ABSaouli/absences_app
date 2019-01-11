const rapportActivite = (
  state = { activateAll: [], activateMounth: {}, activites: [] },
  action
) => {
  switch (action.type) {
    case "GET_RAPPORT_ACTIVITE_SUCCESS":
      return { ...state, activateAll: [...action.rapportActivite] };
    case "GET_ACTIVITE_MOUNTH_ID":
      return { ...state, activateMounth: action.activiteMounth };
    case "GET_ACTIVITE_SUCCESS":
      return { ...state, activites: [...action.activites] };
    default:
      return state;
  }
};

export default rapportActivite;
