import OtpEntity from "./otp.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { OtpRepository } from "./otp.types";

@Injectable()
class OtpService {
  private readonly otpRepository: OtpRepository;

  constructor(@InjectRepository(OtpEntity) otpRepository: OtpRepository) {
    this.otpRepository = otpRepository;
  }

  public async getByUserId(userId: number): Promise<OtpEntity | null> {
    return await this.otpRepository.findOneBy({ userId });
  }
}

export default OtpService;
