// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
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
  }
  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

export const resolvers = {
  Query: {
    books: () => books,
    authors: () => {
      return books.map((book) => book.author);
    },
  },
  Mutation: {
    addBook: (_: undefined, args: { title: string; author: string }) => {
      const newBook = {
        title: args.title,
        author: {
          name: args.author,
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
