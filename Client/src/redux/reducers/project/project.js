const Project = (state = { projects: [], consultantOfProject: [] }, action) => {
  switch (action.type) {
    case "GET_PROJECT_SUCCESS":
      return { ...state, projects: [...action.data] };
    case "GET_CONSULTANT_OF_PROJECT_SUCCESS":
      return {
        ...state,
        consultantOfProject: [...state.consultantOfProject, action.data]
      };
    default:
      return state;
  }
};

export default Project;
