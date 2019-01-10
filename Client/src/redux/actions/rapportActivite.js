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

export const getActivite = activiteMounth => {
  return {
    type: "GET_ACTIVITE_MOUNTH",
    activiteMounth
  };
};
export const getActiviteIdSuccess = rapportActivite => {
  return {
    type: "GET_ACTIVITE_SUCCESS",
    rapportActivite
  };
};

export const enregister = activites => {
  return {
    type: "ENREGISTER_ACTIVITE",
    activites
  };
};
