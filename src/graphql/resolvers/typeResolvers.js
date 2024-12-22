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
    questions: async (
      { questions, id },
      args,
      { dataLoaders: { batchQuestionLoader, batchQuizQuestionIdsLoader } }
    ) => {
      if (!_.isEmpty(questions)) {
        return questions;
      } else {
        const questionIds = await batchQuizQuestionIdsLoader.load(id);

        if (!_.isEmpty(questionIds)) {
          const questions = await batchQuestionLoader.loadMany(
            questionIds.question_ids
          );
          return questions;
        }
        return null;
      }
    },
  },
  Question: {
    id: ({ id }) => id,
    text: ({ question_text }) => question_text,
    options: ({ options }) => options,
    questionType: ({ type }) => type,
    answer: ({ answer }) => answer,
  },
};
