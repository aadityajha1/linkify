import gql from "graphql-tag";

export const authTypeDefs = gql`
  type Auth {
    token: String!
    user: User
    expiresAt: String!
  }
  extend type Mutation {
    login(username: String!, password: String!): Auth
    logout: Boolean!
    register(
      username: String!
      password: String!
      email: String!
      name: String!
    ): Auth
  }
`;
