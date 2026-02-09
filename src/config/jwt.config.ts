import { Injectable } from "@nestjs/common";
import { type JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
class JwtConfig implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      signOptions: { algorithm: "HS512" },
      secret: process.env.ACESS_TOKEN_JWT_SECRET_KEY,
    };
  }
}

export default JwtConfig;
