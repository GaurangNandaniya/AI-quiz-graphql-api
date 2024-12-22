import { addQuizDetails, fetchQuizzesByIds } from "Models/Quizzes";

export const insertQuizDetails = async (data) => {
  return await addQuizDetails(data);
};

export const getQuizzesByIds = async (data) => {
  return fetchQuizzesByIds(data);
};
