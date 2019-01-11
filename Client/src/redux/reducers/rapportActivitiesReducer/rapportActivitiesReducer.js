import { combineReducers } from "redux";

const rapportActivitie = (state = { rapportActivities: [] }, action) => {
  switch (action.type) {
    case "GET_RAPPORT_ACTIVITIES_SUCCESS":
      return { rapportActivities: [...action.rapportActivities] };
    default:
      return state;
  }
};

const currentRapportActivity = (
  state = { rapportActivity: {}, activities: [] },
  action
) => {
  switch (action.type) {
    case "GET_CURRENT_ACTIVITY":
      return { ...state, rapportActivity: action.currentRapportActivity };
    case "GET_ACTIVITIES_SUCCESS":
      return { ...state, activities: [...action.activities] };
    default:
      return state;
  }
};

const rapportActivitiesReducer = combineReducers({
  currentRapportActivity,
  rapportActivitie
});

export default rapportActivitiesReducer;
