export const addProject = project => {
  return {
    type: "ADD_PROJECT_REQUEST",
    project
  };
};

export const getProject = () => {
  return {
    type: "GET_PROJECT_REQUEST"
  };
};

export const getConsultantOfProject = id => {
  return {
    type: "GET_CONSULTANT_OF_PROJECT",
    id
  };
};
