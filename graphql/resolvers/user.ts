import { IResolvers } from "@graphql-tools/utils";
import User from "@/models/Users";
import userService from "@/services/userService";

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
  Mutation: {
    createUser: async (
      _,
      { username, password, email, bio, name, dob, profile_picture }
    ) => {
      const newuser = await userService.createUser({
        username,
        password,
        email,
        bio,
        name,
        dob,
        profile_picture,
      });
      // const newUser = new User({ username, password, email, bio, name, dob });
      return newuser;
    },
    updateUser: async (_, { _id, username, email, bio }) => {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { username, email, bio },
        { new: true }
      );
      return updatedUser;
    },
    deleteUser: async (_, { _id }) => {
      await User.findByIdAndDelete(_id);
      return true;
    },
    login: async (_, { username, password }) => {
      const { token, user } = await userService.login(username, password);
      return { token, user };
    },
    followUser: async (_, { _id }, { user }) => {
      const userTobeFollowed = await User.findById(_id);
      if (!userTobeFollowed) {
        throw new Error("User not found");
      }
      userTobeFollowed.followers.push(user._id);
      await userTobeFollowed.save();
      return userTobeFollowed;
    },
  },
};
