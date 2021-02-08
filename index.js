import dotenv from 'dotenv';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import pkg from 'apollo-server-express';
const { ApolloServer } = pkg;

import connect from './mongoConnect.js';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import metaData from './models/metaData.js';

dotenv.config();

async function run() {
  const app = express();
  const PORT = process.env.PORT || 4001;

  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  await connect();

  const graphqlServer = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: {
      models: {
        metaData,
      },
    }
  });

  const httpServer = createServer(app);

  graphqlServer.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
	console.log(
	  `🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`,
	);
  });
}

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

run().then(() => {
  console.log('🚀 Server Successfully Started');
});
