const Project = (
  state = { projects: [], consultantOfProject: [], ProjectOfConsultant: [] },
  action
) => {
  switch (action.type) {
    case "GET_PROJECT_SUCCESS":
      return { ...state, projects: [...action.data], ProjectOfConsultant: [] };
    case "GET_CONSULTANT_OF_PROJECT_SUCCESS":
      return {
        ...state,
        consultantOfProject: [...state.consultantOfProject, action.data]
      };
    case "GET_PROJECT_OF_CONSULTANT_SUCCESS":
      return {
        ...state,
        ProjectOfConsultant: action.data
      };
    default:
      return state;
  }
};

export default Project;
