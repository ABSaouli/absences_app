export const getRapportActivities = () => {
  return {
    type: "GET_RAPPORT_ACTIVITIES_REQUEST"
  };
};

export const getRapportActivitiesSuccess = rapportActivities => {
  return {
    type: "GET_RAPPORT_ACTIVITIES_SUCCESS",
    rapportActivities
  };
};

export const getActivities = rapportActiviteId => {
  return {
    type: "GET_ACTIVITIES",
    rapportActiviteId
  };
};

export const fixedRapportActivities = currentRapportActivity => {
  return {
    type: "GET_CURRENT_ACTIVITY",
    currentRapportActivity
  };
};

export const getActiviteIdSuccess = activities => {
  return {
    type: "GET_ACTIVITIES_SUCCESS",
    activities
  };
};

export const enregister = activities => {
  return {
    type: "ENREGISTER_ACTIVITIES",
    activities
  };
};
