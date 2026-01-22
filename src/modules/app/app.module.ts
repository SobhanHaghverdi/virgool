import { join } from "path";
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormConfig } from "src/config/typeorm.config";

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
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
export class AppModule {}
