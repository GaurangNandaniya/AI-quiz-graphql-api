import {
  addQuizQuestions,
  fetchQuestionsByIds,
  fetchQuizQuestionsIdsByQuizIds,
} from "Models/QuizQuestions";

export const insertQuizQuestions = async (data) => {
  return await addQuizQuestions(data);
};

export const getQuizQuestionsIdsByQuizIds = async (data) => {
  return await fetchQuizQuestionsIdsByQuizIds(data);
};

export const getQuestionsByIds = async (data) => {
  return await fetchQuestionsByIds(data);
};
