import { getUserById } from "Controllers/userController";

export const query = {
  Query: {
    user: async (parentArgs, args) => {
      const { id } = args;
      return await getUserById({ id });
    },
    quiz: async (parentArgs, args, { dataLoaders: { batchQuizLoader } }) => {
      const { id } = args;
      const result = await batchQuizLoader.load(id);
      return result;
    },
  },
};
