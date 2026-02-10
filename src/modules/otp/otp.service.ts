import { randomInt } from "crypto";
import OtpEntity from "./otp.entity";
import { OtpMessage } from "./otp.message";
import { OtpValidation } from "./enums/otp.enum";
import { OtpGeneration } from "./types/otp.type";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import DateHelper from "src/common/utils/date-helper";
import type { CreateOtpDto, UpdateOtpDto } from "./dto/otp.dto";
import { BaseService } from "src/common/abstracts/base.service";

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
class OtpService extends BaseService<OtpEntity> {
  constructor(
    @InjectRepository(OtpEntity) otpRepository: Repository<OtpEntity>,
  ) {
    super(otpRepository);
  }

  public async getByUserId(userId: number) {
    return await this.repository.findOneBy({ userId });
  }

  public async getByCode(code: string) {
    return await this.repository.findOneBy({ code });
  }

  public async create(dto: CreateOtpDto, entityManager?: EntityManager) {
    const manager = entityManager ?? this.repository.manager;
    const doesOtpExists = await manager.existsBy(OtpEntity, {
      userId: dto.userId,
    });

    if (doesOtpExists) throw new ConflictException(OtpMessage.Duplicate);
    const { code, expiresAt } = this.generateCodeAndExpirationDate();

    return await this.createEntity({ ...dto, code, expiresAt }, manager);
  }

  public async update(
    id: number,
    dto: UpdateOtpDto,
    entityManager?: EntityManager,
  ) {
    const {
      verify = undefined,
      isNewRequest = undefined,
      isCodeInvalid = undefined,
    } = dto;

    const manager = entityManager ?? this.repository.manager;

    const otp = await manager.findOneBy(OtpEntity, { id });
    if (!otp) throw new NotFoundException(OtpMessage.NotFound);

    if (isNewRequest !== undefined && isNewRequest) {
      const { code, expiresAt } = this.generateCodeAndExpirationDate();

      otp.code = code;
      otp.totalRequests++;
      otp.expiresAt = expiresAt;
      otp.lastSentAt = new Date();
    } else if (isCodeInvalid !== undefined && isCodeInvalid) {
      otp.totalFailedAttempts++;
      otp.lastFailedAt = new Date();
    } else if (verify !== undefined && verify) {
      otp.lastVerifiedAt = new Date();
    }

    return await this.saveChanges(otp, manager);
  }

  private generateCodeAndExpirationDate(): OtpGeneration {
    const code = randomInt(10000, 99999).toString();

    const expiresAt = DateHelper.addMinute(
      OtpValidation.ExpireDurationInMinute,
    );

    return { code, expiresAt };
  }
}

export default OtpService;
