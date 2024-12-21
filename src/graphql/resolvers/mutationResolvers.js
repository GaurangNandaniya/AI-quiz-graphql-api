import { generateQuiz } from "Controllers/quizGeneration";

export const mutation = {
  Mutation: {
    createQuiz: async (parentArgs, args, context) => {
      const { input } = args;

      const result = await generateQuiz({
        ...input,
        jwtUser: context?.expressResponse.locals.jwtUser,
      });
      return result;
    },
  },
};
