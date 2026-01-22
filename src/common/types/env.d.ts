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
  }
}
