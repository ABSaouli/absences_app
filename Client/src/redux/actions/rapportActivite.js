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

export const getActivite = rapportActiviteId => {
  return {
    type: "GET_ACTIVITE_MOUNTH",
    rapportActiviteId
  };
};

export const fixRapportActiviteId = activiteMounth => {
  return {
    type: "GET_ACTIVITE_MOUNTH_ID",
    activiteMounth
  };
};

export const getActiviteIdSuccess = activites => {
  return {
    type: "GET_ACTIVITE_SUCCESS",
    activites
  };
};

export const enregister = activites => {
  return {
    type: "ENREGISTER_ACTIVITE",
    activites
  };
};
