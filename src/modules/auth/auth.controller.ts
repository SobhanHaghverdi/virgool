import type { Request, Response } from "express";
import AuthService from "./auth.service";
import AuthGuard from "./guards/auth.guard";
import { AuthDto, CheckOtpDto } from "./dto/auth.dto";
import { CookieKey } from "src/common/enums/cookie.enum";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";

import {
  Get,
  Req,
  Res,
  Post,
  Body,
  UseGuards,
  Controller,
} from "@nestjs/common";

@Controller("auth")
@ApiTags("Auth")
class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("user-existence")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  public async checkUserExistence(@Body() dto: AuthDto, @Res() res: Response) {
    const result = await this.authService.checkUserExistence(dto);

    res.cookie(CookieKey.Otp, result.token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000 * 2),
    });

    res.json({ message: "", code: result.code });
  }

  @Post("check-otp")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  public async checkOtp(@Body() dto: CheckOtpDto) {
    return await this.authService.checkOtp(dto);
  }

  @Get("check-auth")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard)
  public async checkAuth(@Req() request: Request) {
    return request.user;
  }
}

export default AuthController;
