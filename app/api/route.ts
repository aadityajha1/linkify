import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";

export async function GET() {
  await dbConnect();
  const newUser = new Users({
    name: "John Doe",
    age: 30,
    email: "johndoe@example.com",
    password: "password123",
    username: "johndoe",
  });
  await newUser.save();
  console.log("User created successfully", newUser);
  return new Response("Hello, world!");
}
