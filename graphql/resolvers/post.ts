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
  Mutation: {
    createPost: async (_, { content, files }, { user }) => {
      console.log("Images ::: ", files, user);
      // const uploadedFiles = await Promise.all(
      //   files.map((file: any) => uploadFile(file))
      // );
      // const uploadedFiles = await Promise.all(
      //   files.map(async (file: any) => {
      //     const { createReadStream, filename, mimetype, encoding } = await file;
      //     const stream = createReadStream();
      //     // Process the file stream (e.g., save to disk, upload to cloud storage, etc.)
      //     // For demonstration, we'll just return the file metadata
      //     const pathName = `./uploads/${filename}`;
      //     await new Promise((resolve, reject) => {
      //       const writeStream = require("fs").createWriteStream(pathName);
      //       stream.pipe(writeStream).on("finish", resolve).on("error", reject);
      //     });
      //     return { filename, mimetype, encoding };
      //   })
      // );
      // for (let file of files) {
      //   const { createReadStream, filename, mimetype, encoding } = await file;
      //   console.log("File uploaded to:", filename, mimetype);
      //   const stream = createReadStream();
      //   const pathName = `./uploads/${filename}`;
      //   await new Promise((resolve, reject) => {
      //     const writeStream = require("fs").createWriteStream(pathName);
      //     stream.pipe(writeStream).on("finish", resolve).on("error", reject);
      //   });
      // }
      const images: string[] = files; //files.map((file) => file.path);
      const newPost = new Posts({ content, images, author: user._id });
      await newPost.save();
      return newPost;
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
