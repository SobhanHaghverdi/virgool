import { Module } from "@nestjs/common";
import UserService from "./user.service";
import OtpEntity from "./entities/otp.entity";
import UserController from "./user.controller";
import UserEntity from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserProfileEntity from "./entities/user-profile.entity";

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity, OtpEntity]),
  ],
})
class UserModule {}

export default UserModule;
