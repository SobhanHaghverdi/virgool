import OtpService from "../otp/otp.service";
import { AuthMessage } from "./auth.message";
import type { AuthDto } from "./dto/auth.dto";
import UserService from "../user/user.service";
import { AuthMethod } from "./enums/auth.enum";
import { isEmail, isMobilePhone } from "class-validator";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
class AuthService {
  private readonly otpService: OtpService;
  private readonly userService: UserService;

  constructor(otpService: OtpService, userService: UserService) {
    this.otpService = otpService;
    this.userService = userService;
  }

  public async authenticate(dto: AuthDto) {
    const { identifier } = dto;
    const authMethod = this.detectIdentifierType(identifier);

    let user = await this.userService.getByAuthMethod(authMethod, identifier);

    if (!user) {
      user = await this.register(authMethod, identifier);
    }

    //* Create or update otp
    const otp = await this.otpService.getByUserId(user.id);

    if (otp) {
      await this.otpService.update(otp.id, { isNewRequest: true });
    } else {
      await this.otpService.create({ userId: user.id });
    }

    return user;
  }

  public async register(authMethod: AuthMethod, identifier: string) {
    if (
      authMethod !== AuthMethod.Email &&
      authMethod !== AuthMethod.PhoneNumber
    ) {
      throw new UnauthorizedException(
        AuthMessage.InvalidEmailOrPhoneNumberOrUserName,
      );
    }

    return await this.userService.create({ [authMethod]: identifier });
  }

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
