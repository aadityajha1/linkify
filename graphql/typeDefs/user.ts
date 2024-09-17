import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    profile_picture: String
    name: String!
    username: String!
    password: String!
    email: String!
    bio: String!
    followers: [User!]!
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    getUser(_id: ID!): User!
    getUsers: [User!]!
  }
`;
