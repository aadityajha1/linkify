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
    images: [String!]!
  }

  extend type Query {
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post!
    getFeeds(limit: Int, page: Int): [Post]
  }
  extend type Mutation {
    createPost(content: String!, files: [String!]): Post!
    updatePost(id: ID!, content: String, photos: [String!]): Post!
    deletePost(id: ID!): Boolean!
  }
`;
