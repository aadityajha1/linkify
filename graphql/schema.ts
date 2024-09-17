// import { gql } from 'apollo-server-micro';
import { userTypeDefs } from "./typeDefs/user";
// import { postTypeDefs } from './typeDefs/post';
import { userResolvers } from "./resolvers/user";
// import { postResolvers } from './resolvers/post';
import gql from "graphql-tag";

const rootTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [rootTypeDefs, userTypeDefs];
export const resolvers = [userResolvers];
