import Comment from "@/models/Comment";
import { IResolvers } from "@graphql-tools/utils";

export const commentResolvers: IResolvers = {
  Query: {
    getAllComments: async () => {
      // Fetch comments from database
      return Comment.find({});
    },
    getCommentById: (_, { id }) => {
      // Fetch comment from database by id
      return Comment.findById(id);
    },
  },
  //   Mutation: {
  //     createComment: (_, { postId, content }, { dataSources }) => {
  //       // Create a new comment in the database
  //       const newComment = new Comment({ postId, content });
  //       return dataSources.postAPI.createComment(newComment);
  //     },
  //   },
};
