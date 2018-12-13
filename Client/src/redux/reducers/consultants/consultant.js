const consultants = (state = [], action) => {
  switch (action.type) {
    case "GET_CONSULTANTS":
      return [...action.consultants];
    default:
      return state;
  }
};

export default consultants;
