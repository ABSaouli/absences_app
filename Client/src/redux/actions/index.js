let nextAbsence = 0;
export const addAbsence = absence => {
  return {
    type: "ADD_ABSENCE",
    id: (nextAbsence++).toString(),
    absence: absence
  };
};

export const registerUser = user => {
  return {
    type: "REGISTER",
    user
  };
};

export const validAbsence = id => {
  return {
    type: "VALID_ABSENCE",
    id
  };
};

export const refusAbsence = id => {
  return {
    type: "REFUS_ABSENCE",
    id
  };
};

export const auth = user => {
  return {
    type: "AUTH",
    user
  };
};

export const addUser = (user, TypeUser) => {
  return {
    type: "ADD_USER",
    TypeUser,
    user
  };
};

export const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  payload: { id }
});
