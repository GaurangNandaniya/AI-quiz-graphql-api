import serverless from "serverless-http";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import AuthRoutes from "Routes/authRoutes";
import typeDefs from "GraphqlTypeDefs";
import resolvers from "GraphqlResolver";
import { authenticateUser } from "Middleware/authMiddleware";

const app = express();

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

//adding routes
app.use("/auth", AuthRoutes);

app.use(
  "/graphql",
  authenticateUser,
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {
        expressRequest: req,
        expressResponse: res,
        jwtUser: res.locals.jwtUser,
      };
    },
  })
);

const graphqlApiHandler = serverless(app);

export { graphqlApiHandler };
