import OtpEntity from "./otp.entity";
import OtpService from "./otp.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  exports: [OtpService],
  providers: [OtpService],
  imports: [TypeOrmModule.forFeature([OtpEntity])],
})
class OtpModule {}

export default OtpModule;
