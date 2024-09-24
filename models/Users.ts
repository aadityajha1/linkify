import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  dob: Date;
  profile_picture: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  followers?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    profile_picture: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    followers: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
