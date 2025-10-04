import { ApolloServer } from "@apollo/server";

const users = [
  {
    id: 1,
    name: "Kate Chopin",
    posts: [
      { id: 1, title: "Post 1", userId: 1 },
      { id: 2, title: "Post 2", userId: 1 },
    ],
  },
  {
    id: 2,
    name: "Bob Dylan",
    posts: [
      { id: 3, title: "Post 3", userId: 2 },
      { id: 4, title: "Post 4", userId: 2 },
    ],
  },
];

export const typeDefs = `#graphql
  type User {
    id: Int!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: Int!
    title: String!
    user: User!
  }

  type Query {
    users: [User!]!
  }
`;

export const resolvers = {
  Query: {
    users: () => users,
  },
};
