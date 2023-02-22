import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'node:fs';
import resolvers from './graphql/resolvers';

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];

// const typeDefs = `#graphql
//   type Book {
//     title: String
//     author: String
//   }
//   type Query {
//     books: [Book]
//   }
// `;

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// const typeDefs = readFileSync(
//   join(process.cwd(), './src/prisma/data/accounts.csv'),
// );
const typeDefs = readFileSync('apps/server/src/graphql/schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

startServer();

// Error: ENOENT: no such file or directory, open './src/graphql/schema.graphql'
