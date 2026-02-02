import { randomInt } from "crypto";
import { Repository } from "typeorm";
import OtpEntity from "./otp.entity";
import type { CreateOtpDto } from "./dto/otp.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
class OtpService {
  private readonly otpRepository: Repository<OtpEntity>;

  constructor(
    @InjectRepository(OtpEntity) otpRepository: Repository<OtpEntity>,
  ) {
    this.otpRepository = otpRepository;
  }

  public async create(dto: CreateOtpDto) {
    const doesOtpExists = await this.otpRepository.existsBy({
      userId: dto.userId,
    });

    if (doesOtpExists) {
      throw new ConflictException("کد یکبار مصرف قبلا ثبت شده است.");
    }

    const code = randomInt(10000, 99999).toString();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 2); //* Two minutes

    const otp = this.otpRepository.create({ ...dto, code, expiresAt });
    return await this.save(otp);
  }

  public async save(entity: OtpEntity) {
    return await this.otpRepository.save(entity);
  }
}

export default OtpService;
