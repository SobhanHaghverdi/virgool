import { Module } from "@nestjs/common";
import UserService from "./user.service";
import UserController from "./user.controller";
import UserEntity from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
class UserModule {}

export default UserModule;
