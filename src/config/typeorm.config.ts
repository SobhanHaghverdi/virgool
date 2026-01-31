import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    const {
      DATABASE_HOST,
      DATABASE_PORT,
      DATABASE_NAME,
      DATABASE_PASSWORD,
      DATABASE_USER_NAME,
    } = process.env;

    return {
      type: "postgres",
      synchronize: true,
      port: DATABASE_PORT,
      host: DATABASE_HOST,
      autoLoadEntities: true,
      database: DATABASE_NAME,
      password: DATABASE_PASSWORD,
      username: DATABASE_USER_NAME,
    };
  }
}
