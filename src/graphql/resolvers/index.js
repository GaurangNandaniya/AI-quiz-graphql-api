import _ from "lodash";
import { query } from "./queryResolvers";
import { mutation } from "./mutationResolvers";
import { typeResolvers } from "./typeResolvers";

const resolvers = {
  Query: {},
  Mutation: {},
};

export default _.merge(resolvers, query, mutation, typeResolvers);
