import { JwtService } from "@nestjs/jwt";
import OtpService from "../otp/otp.service";
import { AuthMessage } from "./auth.message";
import UserEntity from "../user/user.entity";
import UserService from "../user/user.service";
import DateHelper from "src/common/utils/date-helper";
import { OtpValidation } from "../otp/enums/otp.enum";
import { isEmail, isMobilePhone } from "class-validator";
import type { AccessTokenPayload } from "./types/auth.type";
import type { AuthDto, VerifyOtpDto } from "./dto/auth.dto";
import { AuthMethod, JwtExpiration } from "./enums/auth.enum";

import {
  Inject,
  Injectable,
  forwardRef,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
class AuthService {
  private readonly otpService: OtpService;
  private readonly jwtService: JwtService;
  private readonly userService: UserService;

  constructor(
    otpService: OtpService,
    jwtService: JwtService,
    @Inject(forwardRef(() => UserService)) userService: UserService,
  ) {
    this.otpService = otpService;
    this.jwtService = jwtService;
    this.userService = userService;
  }

  async authenticate(dto: AuthDto) {
    const { identifier, userId = undefined } = dto;
    const authMethod = this.detectIdentifierType(identifier);

    let user: UserEntity | null;

    if (userId) {
      user = await this.userService.getById(userId);
    } else {
      user = await this.userService.getByAuthMethod(authMethod, identifier);
    }

    if (!user) {
      user = await this.register(authMethod, identifier);
    }

    //* Create or update otp
    const otp = await this.otpService.getByUserId(user.id, authMethod);

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
      await this.otpService.create({ userId: user.id, method: authMethod });
    }

    return { userId: user.id, authMethod };
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<string> {
    const { code, userId, authMethod } = dto;
    const user = await this.userService.getById(userId);

    const otp = user?.otps?.find((otp) => otp.method === authMethod);

    if (!user || !otp) {
      throw new UnauthorizedException(AuthMessage.Unauthorized);
    }

    //* Validate
    if (otp.expiresAt < new Date()) {
      throw new UnauthorizedException(AuthMessage.ExpiredOtp);
    }

    if (otp.code !== code) {
      await this.otpService.update(otp.id, { isCodeInvalid: true });
      throw new UnauthorizedException(AuthMessage.InvalidOtp);
    }

    const verificationMap = {
      [AuthMethod.Email]: "isEmailVerified",
      [AuthMethod.PhoneNumber]: "isPhoneNumberVerified",
    };

    //* Update verification field only if auth method is not user name
    if (authMethod !== AuthMethod.UserName) {
      await this.userService.update(user.id, {
        [verificationMap[authMethod]]: true,
      });
    }

    await this.otpService.update(otp.id, { verify: true });
    return this.generateAccessToken(user);
  }

  async verifyAccessToken(token: string) {
    try {
      const payload =
        await this.jwtService.verifyAsync<AccessTokenPayload>(token);

      const user = await this.userService.getById(payload?.userId);

      if (!user) {
        throw new UnauthorizedException(AuthMessage.Unauthorized);
      }

      return payload;
    } catch {
      throw new UnauthorizedException(AuthMessage.Unauthorized);
    }
  }

  private async generateAccessToken(user: UserEntity) {
    return this.jwtService.signAsync<AccessTokenPayload>(
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

    return this.userService.create({ [authMethod]: identifier });
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
