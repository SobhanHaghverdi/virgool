import { join } from "path";
import OtpModule from "../otp/otp.module";
import UserModule from "../user/user.module";
import AuthModule from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import TypeormConfig from "src/config/typeorm.config";
import CategoryModule from "../category/category.module";
import UserProfileModule from "../user-profile/user-profile.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import OmitEmptyMiddleware from "src/common/middlewares/omit-empty.middleware";

@Module({
  imports: [
    OtpModule,
    UserModule,
    AuthModule,
    CategoryModule,
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
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OmitEmptyMiddleware);
  }
}

export default AppModule;
