import { ApolloServer } from "@apollo/server";

const libraries = [{ branch: "main" }, { branch: "staging" }];
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    branch: "main",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    branch: "staging",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    branch: "staging",
  },
];

export const typeDefs = `#graphql
  type Library {
    branch: String!
    books: [Book]
  }
  type Book {
    title: String!
    author: String!
    branch: String!
  }
  type Query {
    libraries: [Library]
    books: [Book]
  }
`;

export const resolvers = {
  Query: {
    libraries: () => libraries,
    books: () => books,
  },
  Library: {
    books: (parent: { branch: string }) => {
      return books.filter((book) => book.branch === parent.branch);
    },
  },
};
