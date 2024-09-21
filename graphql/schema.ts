// import { gql } from 'apollo-server-micro';
import { userTypeDefs } from "./typeDefs/user";
import { postTypeDefs } from "./typeDefs/post";
import { userResolvers } from "./resolvers/user";
// import { postResolvers } from './resolvers/post';
import gql from "graphql-tag";
import { commentTypeDefs } from "./typeDefs/comment";
import { postResolvers } from "./resolvers/post";
import { commentResolvers } from "./resolvers/comment";

const rootTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  commentTypeDefs,
];
export const resolvers = [userResolvers, postResolvers, commentResolvers];
