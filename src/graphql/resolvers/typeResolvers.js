import _ from "lodash";

export const typeResolvers = {
  User: {
    id: ({ id }) => id,
    firstName: ({ first_name }) => first_name,
    lastName: ({ last_name }) => last_name,
    email: ({ email }) => email,
  },
  Quiz: {
    id: ({ id }) => id,
    questionCount: ({ questionCount }) => questionCount,
    title: ({ title }) => title,
    type: ({ type }) => type,
    difficultyLevel: ({ difficultyLevel }) => difficultyLevel,
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
    type: ({ type }) => type,
    answer: ({ answer }) => answer,
  },
};
