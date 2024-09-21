import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";

export async function GET() {
  await dbConnect();
  const newUser = new Users({
    name: "Aaditya Jha",
    age: 30,
    email: "aadityajha@example.com",
    password: "password123",
    username: "aadityajha",
    bio: "Innovative software engineer with a passion for cutting-edge technologies. Specializing in AI and machine learning, I strive to create solutions that push the boundaries of what's possible in tech.",
  });
  await newUser.save();
  console.log("User created successfully", newUser);
  return new Response("Hello, world!");
}
