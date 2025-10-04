import { ApolloServer } from "@apollo/server";

export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
  }
  type Subscription {
    postCreated: Post
  }
  type Query {
    books: [String]
  }
`;

export const resolvers = {
  Query: {
    books: () => ["The Awakening", "City of Glass"],
  },
};
