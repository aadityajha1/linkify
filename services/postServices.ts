import Posts from "@/models/Posts";
import Users, { User } from "@/models/Users";
import mongoose from "mongoose";
import { PipelineOptions } from "stream";

class PostServices {
  async getFeedPosts(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const user = await Users.findById(userId);

    const userFeed = await Posts.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $match: {
          "author.followers": new mongoose.Types.ObjectId(userId),
        },
      },

      {
        $sort: { createdAt: -1 },
      },

      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);
    console.log("Userfeed:: ", userFeed);
    return userFeed;
  }
}

export default new PostServices();
