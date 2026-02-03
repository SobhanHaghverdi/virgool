import { EntityManager } from "typeorm";
import OtpService from "../otp/otp.service";
import { AuthMessage } from "./auth.message";
import type { AuthDto } from "./dto/auth.dto";
import UserService from "../user/user.service";
import { AuthMethod } from "./enums/auth.enum";
import { isEmail, isMobilePhone } from "class-validator";
import { Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
class AuthService {
  private readonly otpService: OtpService;
  private readonly userService: UserService;
  private readonly entityManager: EntityManager;

  constructor(
    otpService: OtpService,
    userService: UserService,
    entityManager: EntityManager,
  ) {
    this.otpService = otpService;
    this.userService = userService;
    this.entityManager = entityManager;
  }

  public async register(dto: AuthDto) {
    const { identifier } = dto;
    const authMethod = this.detectIdentifierType(identifier);

    if (
      authMethod !== AuthMethod.Email &&
      authMethod !== AuthMethod.PhoneNumber
    ) {
      throw new BadRequestException(AuthMessage.InvalidEmailOrPhoneNumber);
    }

    //* Start transaction (create user and otp)
    const user = await this.entityManager.transaction(async (manager) => {
      const user = await this.userService.create(
        { [authMethod]: identifier },
        manager,
      );

      const otp = await this.otpService.create({ userId: user.id }, manager);

      //* Save otp id in user record
      user.otpId = otp.id;
      return await this.userService.saveChanges(user, manager);
    });

    return user;
  }

  public async login(dto: AuthDto) {}

  private detectIdentifierType(identifier: string): AuthMethod {
    if (isMobilePhone(identifier, "fa-IR")) {
      return AuthMethod.PhoneNumber;
    }

    if (isEmail(identifier)) {
      return AuthMethod.Email;
    }

    return AuthMethod.UserName;
  }
}

export default AuthService;
