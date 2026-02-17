import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserProfileEntity from "./user-profile.entity";
import UserProfileService from "./user-profile.service";

@Module({
  exports: [UserProfileService],
  providers: [UserProfileService],
  imports: [TypeOrmModule.forFeature([UserProfileEntity])],
})
class UserProfileModule {}

export default UserProfileModule;
