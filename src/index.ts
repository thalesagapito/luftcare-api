/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
import 'reflect-metadata';
import './setup-env';
import { createConnection as getTypeORMConnection } from 'typeorm';
import { host, port, getNewApolloServer } from '@/server';

async function bootstrap(): Promise<void> {
  try {
    // create TypeORM connection
    await getTypeORMConnection();
    // Create GraphQL server
    const server = await getNewApolloServer();
    // Start the server
    await server.listen(port, host).then(({ url }) => {
      console.log(`Server running at ${url}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
