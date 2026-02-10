namespace NodeJS {
  interface ProcessEnv {
    //* Application
    PORT: number;

    //* Database
    DATABASE_PORT: number;
    DATABASE_NAME: string;
    DATABASE_HOST: string;
    DATABASE_PASSWORD: string;
    DATABASE_USER_NAME: string;
    DATABASE_MAX_POOL_SIZE: number;

    //* Secrets
    ACESS_TOKEN_JWT_SECRET_KEY: string;
  }
}
