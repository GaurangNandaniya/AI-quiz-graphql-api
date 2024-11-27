import serverless from "serverless-http";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

const app = express();

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (...args) => console.log(args) || "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//https://www.apollographql.com/docs/apollo-server/migration/#new-approach-to-serverless-frameworks
server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

const corsOptions = {
  origin: "*",
  allowedHeaders: "Content-Type,Authorization",
};

//add cors as browser security
app.use(cors(corsOptions), express.json());

app.use(
  "/graphql",
  // authenticateUser,
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {
        expressRequest: req,
        expressResponse: res,
      };
    },
  })
);

const graphqlApiHandler = serverless(app);

export { graphqlApiHandler };
