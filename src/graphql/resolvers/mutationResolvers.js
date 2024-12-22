import { generateQuiz } from "Controllers/quizGeneration";

export const mutation = {
  Mutation: {
    createQuiz: async (parentArgs, args, { jwtUser }) => {
      const { input } = args;

      const result = await generateQuiz({
        ...input,
        jwtUser: jwtUser,
      });
      return result;
    },
  },
};
