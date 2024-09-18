import mongoose from "mongoose";
import { Post } from "./Posts";
import { User } from "./Users";
export interface Comment extends mongoose.Document {
  user: User["_id"];
  content: string;
  post: Post["_id"];
  replies: Comment["_id"][];
  createdAt: Date;
  updatedAt: Date;
  likes: User["_id"][];
}

const commentsSchema = new mongoose.Schema<Comment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model<Comment>("Comment", commentsSchema);
