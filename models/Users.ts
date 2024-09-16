import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  age: number;
  profile_picture: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  followers: string[];
}

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    profile_picture: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    followers: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
