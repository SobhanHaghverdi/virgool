import UserEntity from "./user.entity";
import UserService from "./user.service";
import AuthModule from "../auth/auth.module";
import UserController from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, forwardRef } from "@nestjs/common";
import UserProfileModule from "../user-profile/user-profile.module";

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [
    UserProfileModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
class UserModule {}

export default UserModule;
