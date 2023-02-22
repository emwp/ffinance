import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'node:fs';
import resolvers from './graphql/resolvers';

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
