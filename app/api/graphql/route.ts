import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
// import { gql } from "graphql-tag";
import { resolvers, typeDefs } from "@/graphql/schema";
import dbConnect from "@/lib/mongodb";
import { getUser } from "@/utils/auth";
import { NextApiRequest } from "next";

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "Hello world!",
//   },
// };

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    await dbConnect();
    const user = await getUser(req);
    return { req, user };
  },
});

export { handler as GET, handler as POST };
