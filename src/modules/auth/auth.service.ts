import { JwtService } from "@nestjs/jwt";
import OtpService from "../otp/otp.service";
import { AuthMessage } from "./auth.message";
import UserService from "../user/user.service";
import UserEntity from "../user/entities/user.entity";
import DateHelper from "src/common/utils/date-helper";
import { OtpValidation } from "../otp/enums/otp.enum";
import { isEmail, isMobilePhone } from "class-validator";
import type { AccessTokenPayload } from "./types/auth.type";
import type { AuthDto, VerifyOtpDto } from "./dto/auth.dto";
import { AuthMethod, JwtExpiration } from "./enums/auth.enum";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
class AuthService {
  private readonly otpService: OtpService;
  private readonly jwtService: JwtService;
  private readonly userService: UserService;

  constructor(
    otpService: OtpService,
    jwtService: JwtService,
    userService: UserService,
  ) {
    this.otpService = otpService;
    this.jwtService = jwtService;
    this.userService = userService;
  }

  public async authenticate(dto: AuthDto): Promise<UserEntity> {
    const { identifier } = dto;
    const authMethod = this.detectIdentifierType(identifier);

    let user = await this.userService.getByAuthMethod(authMethod, identifier);

    if (!user) {
      user = await this.register(authMethod, identifier);
    }

    //* Create or update otp
    const otp = await this.otpService.getByUserId(user.id);

    if (otp) {
      const limitationDate = DateHelper.addMinute(
        OtpValidation.ExpireDurationInMinute,
        otp.lastSentAt,
      );

      if (limitationDate > new Date()) {
        throw new UnauthorizedException(AuthMessage.SendOtpLimit);
      }

      await this.otpService.update(otp.id, { isNewRequest: true });
    } else {
      await this.otpService.create({ userId: user.id });
    }

    return user;
  }

  public async verifyOtp(dto: VerifyOtpDto): Promise<string> {
    const { code, userId } = dto;
    const user = await this.userService.getById(userId);

    if (!user || !user.otp) {
      throw new UnauthorizedException(AuthMessage.Unauthorized);
    }

    const otp = user.otp;

    //* Validate
    if (otp.expiresAt < new Date()) {
      throw new UnauthorizedException(AuthMessage.ExpiredOtp);
    }

    if (otp.code !== code) {
      await this.otpService.update(otp.id, { isCodeInvalid: true });
      throw new UnauthorizedException(AuthMessage.InvalidOtp);
    }

    await this.otpService.update(otp.id, { verify: true });
    return await this.generateAccessToken(user);
  }

  public async verifyAccessToken(token: string) {
    try {
      const payload =
        await this.jwtService.verifyAsync<AccessTokenPayload>(token);

      const user = await this.userService.getById(payload?.userId);
      if (!user) throw new UnauthorizedException(AuthMessage.Unauthorized);

      return payload;
    } catch {
      throw new UnauthorizedException(AuthMessage.Unauthorized);
    }
  }

  private async generateAccessToken(user: UserEntity) {
    return await this.jwtService.signAsync<AccessTokenPayload>(
      {
        userId: user.id,
        userName: user.userName,
      },
      { expiresIn: JwtExpiration.AccessToken },
    );
  }

  private async register(authMethod: AuthMethod, identifier: string) {
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
