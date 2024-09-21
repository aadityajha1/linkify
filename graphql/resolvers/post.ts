import Posts from "@/models/Posts";
import { IResolvers } from "@graphql-tools/utils";

export const postResolvers: IResolvers = {
  Query: {
    getAllPosts: () => {
      return Posts.find({});
    },
    getPostById: (_, { _id }) => {
      return Posts.findById(_id);
    },
    // getPostsByAuthor: (_, { author }) => {
    //   return Posts.find({ author });
    // },
    // getPostsByCategory: (_, { category }) => {
    //   return Posts.find({ category });
    // },
    // getPostsByTitle: (_, { title }) => {
    //   return Posts.find({ title: { $regex: title, $options: "i" } });
    // },
    // getPostsByContent: (_, { content }) => {
    //   return Posts.find({ content: { $regex: content, $options: "i" } });
    // },
    // getPostsByCreatedAt: (_, { createdAt }) => {
    //   return Posts.find({ createdAt });
    // },
    // getPostsByLikes: (_, { likes }) => {
    //   return Posts
    // }
  },
  // Mutation: {
  //   createPost: (_, { title, content }, { dataSources }) => {
  //     return dataSources.postAPI.createPost({ title, content });
  //   },
  //   getAllPosts: () => {
  //     return Posts.find({});
  //   },
  //   getPostById: (_, { _id }) => {
  //     return Posts.findById(_id);
  //   },
  // },
};
