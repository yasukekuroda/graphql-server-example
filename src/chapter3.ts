import { ApolloServer } from "@apollo/server";

export const typeDefs = `#graphql
  type Query {
    books: [String]
  }
`;

export const resolvers = {
  Query: {
    books: () => ["The Awakening", "City of Glass"],
  },
};
