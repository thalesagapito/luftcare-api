/* eslint-disable no-console */
import 'reflect-metadata';
import {
  getNewApolloServer, getTypeORMConnection, port, host,
} from '@/server';

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
