/* eslint-disable no-console */
import 'reflect-metadata';
import { getNewApolloServer, getTypeORMConnection } from '@/server';

async function bootstrap(): Promise<void> {
  try {
    // create TypeORM connection
    await getTypeORMConnection();
    // Create GraphQL server
    const server = await getNewApolloServer();
    // Start the server
    await server.listen(5000).then(({ url }) => {
      console.log(`Server running at ${url}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
