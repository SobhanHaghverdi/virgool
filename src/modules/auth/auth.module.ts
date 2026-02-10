import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import OtpModule from "../otp/otp.module";
import UserModule from "../user/user.module";
import JwtConfig from "src/config/jwt.config";
import AuthController from "./auth.controller";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    OtpModule,
    UserModule,
    JwtModule.registerAsync({ useClass: JwtConfig, inject: [JwtConfig] }),
  ],
})
class AuthModule {}

export default AuthModule;
