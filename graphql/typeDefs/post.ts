import gql from "graphql-tag";

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String
    content: String!
    createdAt: String!
    author: User!
    comments: [Comment!]!
    likes: [User!]!
    photos: [String!]!
  }

  extend type Query {
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post!
  }
`;
