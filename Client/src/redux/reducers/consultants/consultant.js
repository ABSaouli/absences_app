const consultants = (state = [], action) => {
  switch (action.type) {
    case "GET_CONSULTANTS":
      console.log("%%%%%%%%%%%%%%%%%%%%consultant ", action.consultants);

      debugger;
      return [...action.consultants];
    default:
      return state;
  }
};

export default consultants;
