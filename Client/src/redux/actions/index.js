export const addUser = (user, TypeUser) => {
  return {
    type: "ADD_USER",
    TypeUser,
    user
  };
};
