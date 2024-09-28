import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
