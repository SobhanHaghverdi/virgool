import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AuthService from "./auth.service";
import OtpModule from "../otp/otp.module";
import TokenService from "./token.service";
import UserModule from "../user/user.module";
import AuthController from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [UserModule, OtpModule],
  providers: [AuthService, TokenService, JwtService],
})
class AuthModule {}

export default AuthModule;
