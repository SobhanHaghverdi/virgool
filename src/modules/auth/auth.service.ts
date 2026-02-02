import OtpService from "../otp/otp.service";
import type { AuthDto } from "./dto/auth.dto";
import UserService from "../user/user.service";
import { AuthMethod } from "./enums/auth.enum";
import { isEmail, isMobilePhone } from "class-validator";
import { Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
class AuthService {
  private readonly otpService: OtpService;
  private readonly userService: UserService;

  constructor(otpService: OtpService, userService: UserService) {
    this.otpService = otpService;
    this.userService = userService;
  }

  public async register(dto: AuthDto) {
    const { identifier } = dto;
    const authMethod = this.detectIdentifierType(identifier);

    if (
      authMethod !== AuthMethod.Email &&
      authMethod !== AuthMethod.PhoneNumber
    ) {
      throw new BadRequestException("شماره موبایل یا ایمیل صحیح نمی باشد");
    }

    const user = await this.userService.create({ [authMethod]: identifier });
    const otp = await this.otpService.create({ userId: user.id });

    //* Save otp id in user record
    user.otpId = otp.id;
    return await this.userService.save(user);
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
