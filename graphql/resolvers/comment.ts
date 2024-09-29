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
  Mutation: {
    createComment: async (_, { postId, content }, { user }) => {
      // Create a new comment in the database
      console.log("PostID: ", postId, "Content: ", content, "User: ", user._id);
      const newComment = new Comment({ postId, content, user: user._id });
      await newComment.save();
      const comment = await Comment.findById(newComment._id).populate("user");
      return comment;
    },
  },
};
