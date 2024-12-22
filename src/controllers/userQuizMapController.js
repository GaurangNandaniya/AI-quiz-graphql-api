import { addUserQuizMap, fetchUserQuizzesById } from "Models/UserQuizMap";

export const insertUserQuizMap = async (data) => {
  return await addUserQuizMap(data);
};

export const getUserQuizzesById = async (data) => {
  return await fetchUserQuizzesById(data);
};
