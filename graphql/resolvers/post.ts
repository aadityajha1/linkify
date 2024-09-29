import Posts from "@/models/Posts";
import postServices from "@/services/postServices";
import { IResolvers } from "@graphql-tools/utils";
export const postResolvers: IResolvers = {
  Query: {
    getAllPosts: () => {
      return Posts.find({});
    },
    getPostById: (_, { _id }) => {
      return Posts.findById(_id);
    },
    getFeeds: async (_, { limit, page }, { user }) => {
      console.log(typeof limit, typeof page, page, limit);
      const posts = await postServices.getFeedPosts(
        user._id,
        page || 1,
        limit || 10
      );
      return posts;
    },
  },
  Mutation: {
    createPost: async (_, { content, files }, { user }) => {
      console.log("Images ::: ", files, user);
      const images: string[] = files; //files.map((file) => file.path);
      const newPost = new Posts({ content, images, author: user._id });
      await newPost.save();
      const post = await Posts.findById(newPost._id).populate("author");
      return post;
    },
    updatePost: async (_, { _id, title, content, images }, { user }) => {
      const updatedPost = await Posts.findByIdAndUpdate(
        _id,
        { title, content, images },
        { new: true }
      );
      if (!updatedPost) {
        throw new Error("Post not found");
      }
      return updatedPost;
    },
    deletePost: async (_, { _id }, { user }) => {
      const deletedPost = await Posts.findByIdAndDelete(_id);
      if (!deletedPost) {
        throw new Error("Post not found");
      }
      return deletedPost;
    },
  },
};
