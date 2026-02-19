import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import OtpModule from "../otp/otp.module";
import UserModule from "../user/user.module";
import JwtConfig from "src/config/jwt.config";
import AuthController from "./auth.controller";
import { Module, forwardRef } from "@nestjs/common";

@Module({
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    OtpModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({ useClass: JwtConfig, inject: [JwtConfig] }),
  ],
})
class AuthModule {}

export default AuthModule;
