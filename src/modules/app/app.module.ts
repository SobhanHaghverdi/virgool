import { join } from "path";
import OtpModule from "../otp/otp.module";
import UserModule from "../user/user.module";
import BlogModule from "../blog/blog.module";
import AuthModule from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import TypeormConfig from "src/config/typeorm.config";
import CategoryModule from "../category/category.module";
import BlogLikeModule from "../blog-like/blog-like.module";
import UserProfileModule from "../user-profile/user-profile.module";
import BlogBookmarkModule from "../blog-bookmark/blog-bookmark.module";
import { type MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import OmitEmptyMiddleware from "src/common/middlewares/omit-empty.middleware";

@Module({
  imports: [
    OtpModule,
    UserModule,
    BlogModule,
    AuthModule,
    CategoryModule,
    BlogLikeModule,
    UserProfileModule,
    BlogBookmarkModule,
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
    consumer.apply(OmitEmptyMiddleware).forRoutes("*");
  }
}

export default AppModule;
