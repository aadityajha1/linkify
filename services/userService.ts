// import { User } from "@/models/Users";

import Users from "@/models/Users";
import { AuthPayload } from "@/types/auth";
import { User } from "@/types/modelTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
class UserServices {
  async createUser({
    name,
    dob,
    profile_picture,
    username,
    email,
    password,
    bio,
  }: User): Promise<User> {
    const userExists = await Users.findOne({ username, email });
    if (userExists)
      throw new Error("User with this username or email already exists.");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Users({
      name,
      dob,
      profile_picture,
      username,
      email,
      password: hashedPassword,
      bio,
    });
    return newUser.save();
  }

  async login(username: string, password: string): Promise<AuthPayload> {
    const user = await Users.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) throw new Error("User not found.");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new Error("Invalid password.");
    const token = jwt.sign({ _id: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return { user, token };
  }
}
export default new UserServices();
