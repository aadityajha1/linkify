import { IResolvers } from "@graphql-tools/utils";
import User from "@/models/Users";

export const userResolvers: IResolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      const user = await User.findById(_id);
      return user;
    },
    getUsers: async () => {
      const users = await User.find({});
      return users;
    },
  },
};
