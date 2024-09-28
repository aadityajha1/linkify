import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    name: String!
    username: String!
    password: String!
    email: String!
    bio: String!
    dob: String!
    followers: [User!]!
    profile_picture: String!
    createdAt: String!
    updatedAt: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  extend type Query {
    getUser(_id: ID!): User!
    getUsers: [User!]!
  }
  extend type Mutation {
    createUser(
      name: String!
      dob: String!
      profile_picture: String
      username: String!
      email: String!
      password: String!
      bio: String
    ): User!
    updateUser(
      _id: ID!
      name: String
      dob: String
      profile_picture: String
      username: String
      email: String
      password: String
      bio: String
    ): User!
    deleteUser(_id: ID!): Boolean!
    followUser(_id: ID!): User!
    unfollowUser(_id: ID!): User!
    login(username: String!, password: String!): AuthPayload!
    logout: Boolean!
  }
`;
