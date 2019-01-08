export const getRapportActivite = () => {
  return {
    type: "GET_RAPPORT_ACTIVITE_REQUEST"
  };
};
export const getRapportActiviteSuccess = rapportActivite => {
  return {
    type: "GET_RAPPORT_ACTIVITE_SUCCESS",
    rapportActivite
  };
};

export const getActiviteId = id => {
  return {
    type: "GET_ACTIVITE_REQUEST",
    id
  };
};
export const getActiviteIdSuccess = rapportActivite => {
  return {
    type: "GET_ACTIVITE_SUCCESS",
    rapportActivite
  };
};
