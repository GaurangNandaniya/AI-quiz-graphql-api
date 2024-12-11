import { getUserById } from "Controllers/userController";

export const query = {
  Query: {
    user: async (parentArgs, args) => {
      const { id } = args;
      return await getUserById({ id });
    },
  },
};
