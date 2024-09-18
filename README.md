**Readme.md**

# Next.js GraphQL Application with MongoDB

This is a Next.js application that integrates with a GraphQL API and MongoDB for managing posts, users, comments, and likes.

## Features

- User authentication using JWT
- CRUD operations for posts, comments, and likes
- Image upload for post photos
- GraphQL API with type definitions for posts, users, comments, and likes
- MongoDB database for storing data

## Setup Locally

1. Clone the repository:

```bash
git clone https://github.com/aadityajha1/linkify.git
cd linkify
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret
```

Replace `<username>` and `<password>` with your MongoDB cluster credentials.

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

You can now explore the GraphQL API by visiting [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) and using a GraphQL client like GraphQL Playground or Postman.

Note: Make sure you have MongoDB running locally or replace the `MONGODB_URI` with your own MongoDB connection string.
