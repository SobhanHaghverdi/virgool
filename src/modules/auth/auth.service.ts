import { randomInt } from "crypto";
import { Repository } from "typeorm";
import { AuthDto, CheckOtpDto } from "./dto/auth.dto";
import AuthType from "./enums/type.enum";
import TokenService from "./token.service";
import AuthMethod from "./enums/method.enum";
import { AuthResponse } from "./types/response";
import { InjectRepository } from "@nestjs/typeorm";
import OtpEntity from "../user/entities/otp.entity";
import UserEntity from "../user/entities/user.entity";
import { isEmail, isMobilePhone } from "class-validator";
import { AuthMessage, BadRequestMessage } from "src/common/enums/message.enum";

import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  Scope,
  Inject,
} from "@nestjs/common";
import type { Request } from "express";
import { REQUEST } from "@nestjs/core";
import { CookieKey } from "src/common/enums/cookie.enum";

@Injectable({ scope: Scope.REQUEST })
class AuthService {
  private readonly request: Request;
  private readonly tokenService: TokenService;
  private readonly otpRepository: Repository<OtpEntity>;
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity)
    otpRepository: Repository<OtpEntity>,
    tokenService: TokenService,
    @Inject(REQUEST) request: Request,
  ) {
    this.request = request;
    this.tokenService = tokenService;
    this.otpRepository = otpRepository;
    this.userRepository = userRepository;
  }

  public async checkUserExistence(dto: AuthDto): Promise<AuthResponse> {
    const { type, method, value } = dto;

    let result: AuthResponse;

    switch (type) {
      case AuthType.Login:
        result = await this.login(method, value);
        return result;

      case AuthType.Register:
        result = await this.register(method, value);
        return result;

      default:
        throw new UnauthorizedException();
    }
  }

  public async login(method: AuthMethod, value: string): Promise<AuthResponse> {
    const validValue = this.validateValue(method, value);

    let user: UserEntity | null = await this.getExistingUser(
      method,
      validValue,
    );

    if (!user) throw new UnauthorizedException(AuthMessage.NotFoundUser);
    const otp = await this.saveOtp(user.id);
    const token = this.tokenService.createOtpToken({ userId: user.id });

    return { code: otp.code, token };
  }

  public async register(
    method: AuthMethod,
    value: string,
  ): Promise<AuthResponse> {
    const validValue = this.validateValue(method, value);

    let user: UserEntity | null = await this.getExistingUser(
      method,
      validValue,
    );

    if (user) throw new ConflictException(AuthMessage.AlreadyExistsUser);

    if (method === AuthMethod.UserName) {
      throw new BadRequestException(BadRequestMessage.InvalidAuthType);
    }

    user = this.userRepository.create({ [method]: validValue });
    user = await this.userRepository.save(user);

    user.userName = `m_${user.id}`;
    await this.userRepository.save(user);

    const otp = await this.saveOtp(user.id);

    const token = this.tokenService.createOtpToken({ userId: user.id });

    return { code: otp.code, token };
  }

  public async checkOtp(dto: CheckOtpDto) {
    const token = this.request.cookies?.[CookieKey.Otp];
    if (!token) throw new UnauthorizedException(AuthMessage.InvalidOtp);

    const { userId } = this.tokenService.verifyOtpToken(token);
    const otp = await this.otpRepository.findOneBy({ userId });

    if (!otp) throw new UnauthorizedException(AuthMessage.InvalidOtp);

    if (otp.expiresAt < new Date()) {
      throw new UnauthorizedException(AuthMessage.ExpiredOtp);
    }

    if (otp.code !== dto.code) {
      throw new UnauthorizedException(AuthMessage.InvalidOtp);
    }

    return this.tokenService.createAccessToken({ userId });
  }

  public async saveOtp(userId: number) {
    const code = randomInt(10000, 99999).toString();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 2);

    let otp = await this.otpRepository.findOneBy({ userId });
    let doesOtpExists = false;

    if (otp) {
      doesOtpExists = true;

      otp.code = code;
      otp.expiresAt = expiresAt;
    } else {
      otp = this.otpRepository.create({ code, expiresAt, userId });
    }

    otp = await this.otpRepository.save(otp);

    if (!doesOtpExists) {
      await this.userRepository.update({ id: userId }, { otpId: otp.id });
    }

    return otp;
  }

  public async getExistingUser(method: AuthMethod, value: string) {
    let user: UserEntity | null;

    if (method === AuthMethod.PhoneNumber) {
      user = await this.userRepository.findOneBy({
        phoneNumber: value.trim(),
      });
    } else if (method === AuthMethod.Email) {
      user = await this.userRepository.findOneBy({
        email: value.trim(),
      });
    } else if (method === AuthMethod.UserName) {
      user = await this.userRepository.findOneBy({
        userName: value.trim(),
      });
    } else {
      throw new BadRequestException(BadRequestMessage.InvalidAuthType);
    }

    return user;
  }

  public async validateAccessToken(token: string) {
    const { userId } = this.tokenService.verifyAccessToken(token);
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new UnauthorizedException("Please login");
    return user;
  }

  private validateValue(method: AuthMethod, value: string) {
    switch (method) {
      case AuthMethod.UserName:
        break;

      case AuthMethod.Email: {
        if (!isEmail(value)) throw new BadRequestException("Email is invalid");
        break;
      }

      case AuthMethod.PhoneNumber:
        if (!isMobilePhone(value, "fa-IR")) {
          throw new BadRequestException("Phone number is invalid");
        }
        break;

      default:
        throw new BadRequestException("Invalid auth method");
    }

    return value;
  }
}

export default AuthService;
