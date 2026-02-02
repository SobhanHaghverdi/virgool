import { randomInt } from "crypto";
import { Repository } from "typeorm";
import OtpEntity from "./otp.entity";
import type { CreateOtpDto } from "./dto/otp.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, Injectable } from "@nestjs/common";
import { BaseService } from "src/common/abstracts/base.service";

@Injectable()
class OtpService extends BaseService<OtpEntity> {
  constructor(
    @InjectRepository(OtpEntity) otpRepository: Repository<OtpEntity>,
  ) {
    super(otpRepository);
  }

  public async create(dto: CreateOtpDto) {
    const doesOtpExists = await this.repository.existsBy({
      userId: dto.userId,
    });

    if (doesOtpExists) {
      throw new ConflictException("کد یکبار مصرف قبلا ثبت شده است.");
    }

    const code = randomInt(10000, 99999).toString();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 2); //* Two minutes

    return await this.createEntity({ ...dto, code, expiresAt });
  }
}

export default OtpService;
