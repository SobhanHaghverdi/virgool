import { JwtService } from "@nestjs/jwt";
import { AuthMessage } from "src/common/enums/message.enum";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccessTokenPayload, CookiePayload } from "./types/payload";

@Injectable()
class TokenService {
  private readonly jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  createOtpToken(payload: CookiePayload) {
    const token = this.jwtService.sign(payload, {
      expiresIn: 60 * 2,
      secret: process.env.OTP_JWT_SECRET_KEY,
    });

    return token;
  }

  verifyOtpToken(token: string): CookiePayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.OTP_JWT_SECRET_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException(AuthMessage.InvalidOtp);
    }
  }

  createAccessToken(payload: AccessTokenPayload) {
    const token = this.jwtService.sign(payload, {
      expiresIn: "1m",
      secret: process.env.ACESS_TOKEN_JWT_SECRET_KEY,
    });

    return token;
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.ACESS_TOKEN_JWT_SECRET_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException(AuthMessage.InvalidOtp);
    }
  }
}

export default TokenService;
