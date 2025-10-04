import { ApolloServer } from "@apollo/server";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  scalar DateTime
  type UpcomingEvents {
    name: String
    date: DateTime
  }
  enum AllowedColor {
    RED
    GREEN
    BLUE
  }
  input AddBookInput {
    title: String
    author: String
  }
  type Book {
    title: String
    author: Author
  }
  type Author {
    name: String
    books: [Book]
  }
  type Query {
    books: [Book]
    authors: [Author]
    favoriteColor: AllowedColor
    avatar(borderColor: AllowedColor): String
    upcomingEvents: UpcomingEvents
  }
  type Mutation {
    addBook(input: AddBookInput): Book
  }
`;

export const resolvers = {
  DateTime: {
    __parseValue(value: string) {
      return new Date(value);
    },
    __serialize(value: Date) {
      return value instanceof Date ? value.toISOString() : value;
    },
    __parseLiteral(ast: any) {
      return ast.value;
    },
  },
  Query: {
    books: () => books,
    authors: () => {
      return books.map((book) => book.author);
    },
    favoriteColor: () => "BLUE",
    avatar: (_: undefined, args: { borderColor: string }) => {
      return "this is sample avatar url";
    },
    upcomingEvents: () => {
      return {
        name: "Sample Event",
        date: new Date(),
      };
    },
  },
  Mutation: {
    addBook: (
      _: undefined,
      args: { input: { title: string; author: string } },
    ) => {
      const { title, author } = args.input;
      const newBook = {
        title,
        author: {
          name: author,
          books: [],
        },
      };
      books.push(newBook);
      return newBook;
    },
  },
};

const books = [
  {
    title: "The Awakening",
    author: {
      name: "Kate Chopin",
      books: [
        { title: "title1" },
        { title: "title2" },
        { title: "title3" },
        { title: "title4" },
      ],
    },
  },
  {
    title: "City of Glass",
    author: {
      name: "Paul Auster",
      books: [],
    },
  },
];
