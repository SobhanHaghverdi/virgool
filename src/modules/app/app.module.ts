import { join } from "path";
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import UserModule from "../user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { TypeormConfig } from "src/config/typeorm.config";

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      inject: [TypeormConfig],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env"),
    }),
  ],
})
class AppModule {}

export default AppModule;
