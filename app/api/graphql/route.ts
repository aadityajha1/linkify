import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { resolvers, typeDefs } from "@/graphql/schema";
import dbConnect from "@/lib/mongodb";
import { getUser } from "@/utils/auth";
import mongoose from "mongoose";

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  formatError: (formattedError, error) => {
    console.log("Error in formatError::", formattedError);
    if (formattedError.extensions?.code === "INTERNAL_SERVER_ERROR") {
    }

    return {
      ...formattedError,
      message: "Something went wrong!",
    };
  },
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    try {
      await dbConnect();
      const user = await getUser(req);
      return {
        req,
        user: {
          ...user,
          _id: new mongoose.Types.ObjectId(user._id),
        },
      };
    } catch (err) {
      console.error("Error in context::", err);
      return { req: req, user: null };
    }
  },
});

export { handler as GET, handler as POST };
