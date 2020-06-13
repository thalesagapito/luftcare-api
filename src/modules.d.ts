declare namespace NodeJS {
  export interface ProcessEnv {
    DB_NAME: string;
    DB_USERNAME: string;
    DB_HOST: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    APOLLO_LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';
    ENTITIES_PATH: 'src/entities/*' | 'dist/entities/*';
    MIGRATIONS_PATH: 'src/migrations/*' | 'dist/migrations/*';
  }
}
