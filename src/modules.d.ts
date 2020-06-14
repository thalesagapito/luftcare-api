declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    JWT_SECRET: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    APOLLO_LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';
  }
}
