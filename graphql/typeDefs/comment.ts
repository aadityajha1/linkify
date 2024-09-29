import gql from "graphql-tag";

export const commentTypeDefs = gql`
  type Comment {
    id: ID!
    content: String!
    createdAt: String!
    user: User!
    post: Post!
    replies: [Comment!]!
    likes: [User!]!
    updatedAt: String!
  }

  extend type Query {
    getAllComments: [Comment!]!
    getCommentById(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(content: String!, postId: String!): Comment!
    deleteComment(id: ID!): Boolean!
    likeComment(commentId: ID!): Comment!
    replyToComment(commentId: ID!, content: String!): Comment!
  }

  #   extend type Subscription {
  #     newComment: Comment!
  #     commentLiked(commentId: ID!): Comment!
  #   }
`;
