const absence = (state, action) => {
  switch (action.type) {
    case "ADD_ABSENCE":
      return {
        id: action.id,
        DateDebut: action.DateDebut,
        DateFin: action.DateFin,
        TypeAbsence: action.TypeAbsence,
        completed: false
      };
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
    case "VALID_ABSENCE":
      return state.map(t => absence(t, action));
    case "REFUS_ABSENCE":
      return state.map(t => absence(t, action));
    default:
      return state;
  }
};

export default absences;
