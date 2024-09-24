// import { User } from "@/models/Users";

import Users from "@/models/Users";
import { User } from "@/types/modelTypes";

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
    const newUser = new Users({
      name,
      dob,
      profile_picture,
      username,
      email,
      password,
      bio,
    });
    return newUser.save();
  }
}
export default new UserServices();
