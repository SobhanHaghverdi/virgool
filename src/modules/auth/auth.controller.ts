import AuthService from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Post, Body, Controller } from "@nestjs/common";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";

import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiCreatedResponse,
} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("register")
  @ApiOperation({ summary: "Register user" })
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  @ApiCreatedResponse({ description: "User registered successfully" })
  public async register(@Body() dto: AuthDto) {
    await this.authService.register(dto);
    return { message: "حساب کاربری با موفقیت ایجاد شد" };
  }
}

export default AuthController;
