import User from '@/entities/User';
import { UserRole } from '@/enums';
import getUserFromTokenIfValid from '@/use-cases/auth/getUserFromTokenIfValid';
import { resolve } from 'path';
import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { ApolloLogExtension, LoggerOptions } from 'apollo-log';
import { AuthChecker, buildSchema, BuildSchemaOptions } from 'type-graphql';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

config({ path: resolve(__dirname, './.env') });

export type GraphqlContext = { user?: User };

const authChecker: AuthChecker<GraphqlContext, UserRole> = async ({ context: ctx }, authorizedRoles) => {
  const { user } = ctx;
  if (!user) return false;

  const noSpecificRoleIsRequired = authorizedRoles.length === 0;
  const userHasSpecificRoleRequired = authorizedRoles.includes(user.role);
  return noSpecificRoleIsRequired || userHasSpecificRoleRequired;
};

const dbConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  cache: true,
  port: 5432,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logger: 'advanced-console',
  logging: 'all', // can't move to .env, uses an array
  dropSchema: false,
  synchronize: false,
  entities: ['src/entities/*'],
  migrations: ['src/migrations/*'],
};

const graphqlSchemaOptions: BuildSchemaOptions = {
  emitSchemaFile: true,
  resolvers: ['src/resolvers/*'],
  authChecker,
};

const apolloLogOptions: LoggerOptions = {
  level: process.env.APOLLO_LOG_LEVEL,
  prefix: 'apollo: ',
  timestamp: true,
};

const apolloServerExtensions = [
  (): ApolloLogExtension => new ApolloLogExtension(apolloLogOptions),
];

export const getTypeORMConnection = async (): Promise<Connection> => createConnection(dbConnectionOptions);

export const getNewApolloServer = async (): Promise<ApolloServer> => new ApolloServer({
  extensions: apolloServerExtensions,
  schema: await buildSchema(graphqlSchemaOptions),
  context: async ({ req }): Promise<GraphqlContext> => {
    const token = req.headers.authorization;
    const userFromToken = token ? await getUserFromTokenIfValid(token) : undefined;

    return { user: userFromToken };
  },
});
