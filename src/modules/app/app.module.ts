import { join } from "path";
import { Module } from "@nestjs/common";
import OtpModule from "../otp/otp.module";
import UserModule from "../user/user.module";
import AuthModule from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import TypeormConfig from "src/config/typeorm.config";
import UserProfileModule from "../user-profile/user-profile.module";

@Module({
  imports: [
    OtpModule,
    UserModule,
    AuthModule,
    UserProfileModule,
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
