import { resolve } from 'path';
import { ApolloServer } from 'apollo-server';
import { ApolloLogExtension, LoggerOptions } from 'apollo-log';
import { AuthChecker, buildSchema, BuildSchemaOptions } from 'type-graphql';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import getUserFromTokenIfValid from '@/use-cases/auth/getUserFromTokenIfValid';
import User from '@/entities/User';
import { UserRole } from '@/enums';


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
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logger: 'advanced-console',
  logging: 'all', // can't move to .env, uses an array
  dropSchema: false,
  synchronize: false,
  entities: [`${__dirname}/entities/*`],
  migrations: [`${__dirname}/migrations/*`],
};

const graphqlSchemaOptions: BuildSchemaOptions = {
  emitSchemaFile: true,
  resolvers: [resolve(__dirname, 'graphql/resolvers', '*.{js,ts}')],
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

export const port = process.env.SERVER_PORT;
export const host = process.env.SERVER_HOST;
