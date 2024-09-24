import mongoose from "mongoose";
import { User } from "./Users";
import { Comment } from "./Comment";

export interface Post extends mongoose.Document {
  author: User["_id"];
  title: string;
  content: string;
  images: string[];
  likes: User["id"][];
  comments: Comment["id"][];
}

const postSchema = new mongoose.Schema<Post>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String] },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model<Post>("Post", postSchema);
