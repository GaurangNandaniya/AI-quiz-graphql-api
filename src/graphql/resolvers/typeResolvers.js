import _ from "lodash";
import GraphQLJSON from "graphql-type-json";
import { getUserQuizzesById } from "Controllers/userQuizMapController";

export const typeResolvers = {
  JSON: GraphQLJSON,
  User: {
    id: ({ id }) => id,
    firstName: ({ first_name }) => first_name,
    lastName: ({ last_name }) => last_name,
    email: ({ email }) => email,
    quizzes: async ({ id }, args, { dataLoaders: { batchQuizLoader } }) => {
      //TODO: check if we need to add dataloader here
      const quizIds = await getUserQuizzesById({ userId: id });

      const quizzes = await batchQuizLoader.loadMany(_.map(quizIds, "id"));

      return quizzes;
    },
  },
  Quiz: {
    id: ({ id }) => id,
    questionCount: ({ questions_count }) => questions_count,
    title: ({ title }) => title,
    quizType: ({ type }) => type,
    difficultyLevel: ({ difficulty_level }) => difficulty_level,
    time: ({ time }) => time,
    questions: ({ questions, questionId }) => {
      if (_.isEmpty(questionId)) {
        return questions;
      }
      //TODO: add else case with dataloader to fetch question by ids
    },
  },
  Question: {
    id: ({ id }) => id,
    text: ({ text }) => text,
    options: ({ options }) => options,
    questionType: ({ type }) => type,
    answer: ({ answer }) => answer,
  },
};
