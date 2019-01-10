const rapportActivite = (
  state = { activateAll: [], activateMounth: {} },
  action
) => {
  switch (action.type) {
    case "GET_RAPPORT_ACTIVITE_SUCCESS":
      return { ...state, activateAll: [...action.rapportActivite] };
    case "GET_ACTIVITE_MOUNTH":
      return { ...state, activateMounth: action.activiteMounth };
    default:
      return state;
  }
};

export default rapportActivite;
