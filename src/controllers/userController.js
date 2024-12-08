import {
  createUser,
  fetchUserByAuthProvider,
  fetchUserByEmail,
} from "Models/User";

export const createNewUser = async (data) => {
  return await createUser(data);
};

export const getUserByEmail = async (data) => {
  return await fetchUserByEmail(data);
};

export const getUserByAuthProvider = async (data) => {
  return await fetchUserByAuthProvider(data);
};
