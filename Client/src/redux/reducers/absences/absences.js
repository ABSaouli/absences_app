const absence = (state, action) => {
  switch (action.type) {
    case "ADD_ABSENCE": {
      console.log("HEre iam ", action.absence);
      return {
        id: action.absence.id,
        DateDebut: action.absence.DateDebut,
        DateFin: action.absence.DateFin,
        TypeAbsence: action.absence.TypeAbsence,
        completed: false
      };
    }
    case "VALID_ABSENCE":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    case "REFUS_ABSENCE":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: null
      };
    default:
      return state;
  }
};

const absences = (state = [], action) => {
  switch (action.type) {
    case "ADD_ABSENCE":
      return [...state, absence(undefined, action)];
    case "LOAD_ABSENCES":
      return [...action.absence];
    case "VALID_ABSENCE":
      return state.map(t => absence(t, action));
    case "REFUS_ABSENCE":
      return state.map(t => absence(t, action));
    default:
      return state;
  }
};

export default absences;
