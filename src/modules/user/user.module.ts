import { Module } from "@nestjs/common";
import UserService from "./user.service";
import UserController from "./user.controller";
import UserEntity from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserProfileEntity from "./entities/user-profile.entity";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
})
class UserModule {}

export default UserModule;
