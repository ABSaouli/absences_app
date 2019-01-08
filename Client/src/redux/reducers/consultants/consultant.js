const consultants = (state = [], action) => {
  switch (action.type) {
    case "GET_CONSULTANTS":
      return [...action.consultants];
    case "GET_CONSULTANT_EDITE":
      return [action.consultant];
    case "GET_RESPONSABLE_EDITE":
      return [action.responsable];
    default:
      return state;
  }
};

export default consultants;
