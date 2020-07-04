declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    APOLLO_LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';
  }
}
