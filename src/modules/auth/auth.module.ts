import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AuthService from "./auth.service";
import TokenService from "./token.service";
import UserModule from "../user/user.module";
import AuthController from "./auth.controller";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtService],
})
class AuthModule {}

export default AuthModule;
