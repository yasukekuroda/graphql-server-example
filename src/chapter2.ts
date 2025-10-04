import { ApolloServer } from "@apollo/server";

export const typeDefs = `#graphql
  type Query {
    books: [String]
  }
`;

export const resolvers = {
  Query: {
    books: () => ["Book 1", "Book 2", "Book 3"],
  },
};
