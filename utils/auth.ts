import Users from "@/models/Users";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const getUser = async (req: NextRequest) => {
  //   const token = req.headers.authorization?.split(" ")[1];
  const token = req.headers.get("authorization")?.split(" ")[1];
  //   const authHeader = req.headers.["authorization"];
  //   const token = Array.isArray(authHeader)
  //     ? authHeader[0].split(" ")[1]
  //     : authHeader?.split(" ")[1];
  console.log("Token:: ", token);
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
      return await Users.findById(decoded._id);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  return null;
};
