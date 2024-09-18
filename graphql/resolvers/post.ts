import Posts from "@/models/Posts";
import { IResolvers } from "@graphql-tools/utils";

export const postResolvers: IResolvers = {
  Mutation: {
    createPost: (_, { title, content }, { dataSources }) => {
      return dataSources.postAPI.createPost({ title, content });
    },
    getAllPosts: () => {
      return Posts.find({});
    },
    getPostById: (_, { _id }) => {
      return Posts.findById(_id);
    },
  },
};
